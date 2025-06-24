import * as tf from '@tensorflow/tfjs';

export interface PredictionData {
  date: string;
  actual?: number;
  predicted?: number;
}

export class DemandPredictor {
  private model: tf.LayersModel | null = null;

  async createModel() {
    const model = tf.sequential();
    
    model.add(tf.layers.lstm({
      units: 32,
      returnSequences: true,
      inputShape: [12, 1]
    }));
    
    model.add(tf.layers.lstm({
      units: 16,
      returnSequences: false
    }));
    
    model.add(tf.layers.dense({
      units: 1,
      activation: 'linear'
    }));

    model.compile({
      optimizer: tf.train.adam(0.01),
      loss: 'meanSquaredError'
    });

    this.model = model;
    return model;
  }

  async trainModel(historicalData: number[]) {
    if (!this.model) await this.createModel();
    
    const sequences = [];
    const labels = [];
    
    for (let i = 0; i < historicalData.length - 12; i++) {
      sequences.push(historicalData.slice(i, i + 12));
      labels.push(historicalData[i + 12]);
    }

    const xs = tf.tensor3d(sequences, [sequences.length, 12, 1]);
    const ys = tf.tensor2d(labels, [labels.length, 1]);

    await this.model!.fit(xs, ys, {
      epochs: 100,
      batchSize: 32,
      shuffle: true,
      validationSplit: 0.1
    });

    xs.dispose();
    ys.dispose();
  }

  async predict(recentData: number[]): Promise<number> {
    if (!this.model) throw new Error('Model not trained');
    
    const input = tf.tensor3d([recentData.slice(-12)], [1, 12, 1]);
    const prediction = await this.model.predict(input) as tf.Tensor;
    const result = await prediction.data();
    
    input.dispose();
    prediction.dispose();
    
    return result[0];
  }
}