import GenericError from '../utils/errors/GenericError.js'
import handleError from '../utils/handleError.js'
import schemas from './schemas.js'

export default class GenericService {
  constructor(schema) {
    this.model = schemas(schema);
  }

  create(body) {
    return this.model
      .create(body)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        handleError(err);
      });
  }

  get() {
    return this.model
      .find()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        handleError(err);
      });
  }

  getById(id) {
    return this.model
      .findById(id)
      .then((result) => {
        if (result) {
          return result;
        }
        throw new GenericError('Campo não encontrado', 404);
      })
      .catch((err) => {
        handleError(err);
      });
  }

  getPaginate(query, searchQuery = {}) {
    let { perPage, page } = query;
    if (!perPage) perPage = 10;
    if (!page) page = 1;

    const customLabels = {
      totalDocs: 'count',
      docs: 'docs',
      limit: 'docsPerPage',
      page: 'currentPage',
      nextPage: 'next',
      prevPage: 'prev',
      pagingCounter: false,
    };

    const options = {
      page: Number(page),
      limit: Number(perPage),
      sort: { name: 1, email: 1 },
      customLabels,
    };

    return this.model
      .paginate(searchQuery, options)
      .then((result) => {
        if (result) {
          return result;
        }
        throw new GenericError('Campo não encontrado', 404);
      })
      .catch((err) => {
        handleError(err);
      });
  }

  update(id, body) {
    return this.model
      .findByIdAndUpdate(id, body)
      .then((result) => {
        if (result) {
          return result;
        }
        throw new GenericError('Campo não encontrado', 404);
      })
      .catch((err) => {
        handleError(err);
      });
  }

  delete(id) {
    return this.model
      .findByIdAndRemove(id)
      .then((result) => {
        if (result) {
          return result;
        }
        throw new GenericError('Campo não encontrado', 404);
      })
      .catch((err) => {
        handleError(err);
      });
  }
}
