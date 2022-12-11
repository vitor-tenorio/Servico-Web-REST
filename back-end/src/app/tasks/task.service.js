import GenericService from '../generic.service.js'

export default class TaskService extends GenericService {
  constructor() {
    super('task');
  }

  getPaginate(query) {
    return super.getPaginate(query, {
        $or: [
            query.text ? { title: { $regex: query.text, $options: 'i' } } : {},
            query.text ? { description: { $regex: query.text, $options: 'i' } } : {}
        ]
    })
  }
}
