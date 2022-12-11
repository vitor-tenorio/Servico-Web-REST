import { ModalPadrao } from "./ModalPadrao";
import { Button } from ".";
import { useEffect, useState, useMemo } from "react";
import { Task } from "../../services/TasksInterface";
import { CreateTask, EditTask } from "../../services/Tasks";
import createSnackbar from "../utils/createSnackbar";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CustomTextField } from "./TextField";
import TextField from '@mui/material/TextField';
import moment from "moment";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

type ModalTaskProps = {
  onClose: Function;
  open: boolean;
  task?: Task | null;
};

export default function ModalTask(props: ModalTaskProps) {
  const { onClose, open, task } = props;
  const [taskForm, setTaskForm] = useState({} as any);

  useEffect(() => {
    if (task) { 
      taskForm.title = task.title
      taskForm.description = task.description
      taskForm.deadline = task.deadline
      taskForm.completed = task.completed
    }
  }, [task]);

  const handleChangeForm = (atributo: string) => (event: any) => {    
    switch (atributo) {
      case 'deadline':
        setTaskForm({ ...taskForm, [atributo]: event });
        break;
      case 'completed':
        setTaskForm({ ...taskForm, [atributo]: event.target.checked });
        break
      default:
        setTaskForm({ ...taskForm, [atributo]: event.target.value });
        break;
    }
  };

  const isAdd = useMemo(() => !task, [task]);

  function addNewItem() {
    CreateTask(taskForm)
      .then(() => {
        createSnackbar('success', 'Tarefa criada com sucesso!')
      })
      .catch((error: any) => {
        createSnackbar('error', error.response.data.error)
      });
  }

  function editItem() {
    EditTask(task?._id, taskForm)
      .then(({ data } : { data: any }) => {
        createSnackbar('success', 'Tarefa editada com sucesso!')
      })
      .catch((error: any) => {
        createSnackbar('error', error.response.data.error)
      });
  }

  return (
    <ModalPadrao onClose={() => onClose()} open={open}>
      <div
        style={{
          padding: 30,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
          <>
            <CustomTextField
              label="Título da tarefa"
              style={{ marginBottom: 20, width: 300 }}
              onChange={handleChangeForm("title")}
              defaultValue={taskForm?.title}
            />
            <CustomTextField
              label="Descrição da tarefa"
              style={{ marginBottom: 20, width: 300 }}
              onChange={handleChangeForm("description")}
              defaultValue={taskForm?.description}
            />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(params) => <TextField {...params} style={{ marginBottom: 20, width: 300 }} />}
              label="DateTimePicker"
              value={taskForm?.deadline}
              inputFormat="DD/MM/YYYY  HH:mm"
              onChange={handleChangeForm("deadline")}
            />
          </LocalizationProvider>
          <FormControlLabel control={
            <Checkbox 
              onChange={handleChangeForm("completed")}
              defaultValue={taskForm?.completed}
            /> }
          label="Tarefa foi completa" />
            <div style={{ marginTop: 20 }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#2B2D42" }}
                onClick={() => onClose()}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                style={{ marginLeft: 8 }}
                onClick={() => {
                  if (moment(taskForm.deadline).isValid()) { 
                    if (isAdd) {
                      addNewItem();
                    } else {
                      editItem();
                    }
                  } else {
                    createSnackbar('error', 'Prazo incorreto')
                  }
                }}
              >
                Salvar Tarefa
              </Button>
            </div>
          </>
      </div>
    </ModalPadrao>
  );
}
