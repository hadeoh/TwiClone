// generic query builder for all models

class Query {
  constructor(Model) {
    this.Model = Model;
  }
  create(payload) {
    return this.Model.create(payload);
  }

  findOne(payload) {
    return this.Model.findOne(payload).exec();
  }

  findById(payload) {
    return this.Model.findById(payload).exec();
  }

  findAll(payload) {
    return this.Model.find(payload);
  }

  update({ payload, where }) {
    return this.Model.findOneAndUpdate(where, payload, { new: true }).exec();
  }

  delete(payload) {
    return this.Model.findOneAndDelete(payload).exec();
  }
}

export default Query