import Api from "./api";
import { Task } from "./TasksInterface";

export async function GetTasks() {
  return await Api().get<Task[]>("/tarefas");
}
export async function GetTask(id: String) {
  console.log(id);
  return await Api().get<Task[]>(`/tarefas/${id}`);
}
export async function DeleteTask(id: String) {
  return await Api().delete<string>(`/tarefas/${id}`);
}
export async function CreateTask(task: Task | FormData) {
  return await Api().post("/tarefas", task);
}
export async function EditTask(id?: String, task?: Task | FormData) {
  return await Api().put(`/tarefas/${id}`, task);
}
