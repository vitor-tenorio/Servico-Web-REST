export type Task = {
    _id: String,
    id: String, //Adicionado para melhor funcionamento do DataGrid. Seu valor é igual ao _id
    title: String,
    description: String,
    deadline: String,
    completed: Boolean,
}