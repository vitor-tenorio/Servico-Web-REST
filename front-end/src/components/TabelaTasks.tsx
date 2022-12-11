import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ModalTask from "../shared/components/ModalTask";
import { GetTasks, DeleteTask, GetTask } from "../services/Tasks";
import { ModalConfirmacao } from "../shared/components/ModalConfirmacao";
import createSnackbar from "../shared/utils/createSnackbar";
import moment from "moment";
import Box from '@mui/material/Box';

export function TabelaTasks() {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<any>({} as any);
  const [tasks, setTasks] = useState<any[]>([]);
  const [modalConfirmacaoOpened, setModalConfirmacaoOpened] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    GetTasks()
      .then(({ data }) => {
        setTasks(data.map(d => { 
          d.id = d._id
          return d
        }));        })
      .catch((error: any) => {
        createSnackbar('error', error.response.data)
    });    
    setOpen(false);
  };

  const abrirModalConfirmacao = (row: any) => {
    setTask(row);
    setModalConfirmacaoOpened(true);
  };

  const fecharModalConfirmacao = () => {
    setTask({} as any);
    setModalConfirmacaoOpened(false);
  };

  useEffect(() => {
    GetTasks()
      .then(({ data }) => {        
        setTasks(data.map(d => { 
          d.id = d._id
          return d
        }));
      })
      .catch((error: any) => {
        createSnackbar('error', error.response.data)
      });
  }, []);

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Título",
      width: 100,
    },
    {
      field: "description",
      headerName: "Descrição",
      width: 300,
    },
    {
      field: "deadline",
      headerName: "Prazo",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => moment(row.deadline).format("DD/MM/YYYY HH:mm"),
    },
    {
      field: "completed",
      headerName: "Completa",
      width: 100,
      renderCell: ({ row }) => row.completed === 'true' ? "Sim" : "Não",
    },
    {
      field: "buttons",
      headerName: "+",
      headerAlign: "center",
      disableColumnMenu: true,
      width: 100,
      sortable: false,
      renderHeader: () => (
        <AddIcon
          onClick={() => {
            addItem();
          }}
          style={{ cursor: "pointer" }}
        />
      ),
      renderCell: (params: any) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <EditIcon
            onClick={() => {
              editItem(params.row);
            }}
            style={{ cursor: "pointer" }}
          />
          <DeleteIcon
            onClick={() => {
              abrirModalConfirmacao(params.row);
            }}
            style={{ cursor: "pointer" }}
          />
        </Box>
      ),
    },
  ];

  function addItem(): void {
    setTask(null);
    handleClickOpen();
  }

  function editItem(row: any): void {
    setTask(row);
    handleClickOpen();
  }

  function deleteItem(): void {
    DeleteTask(task._id).then(({ data }) => {
      GetTasks()
        .then(({ data }) => {
          createSnackbar('success', 'Tarefa deletada com sucesso')
          setTasks(data.map(d => { 
            d.id = d._id
            return d
          }));        })
        .catch((error: any) => {
          createSnackbar('error', error.response.data)
        });
    });
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ModalConfirmacao
        onClose={fecharModalConfirmacao}
        open={modalConfirmacaoOpened}
        textoAcao={'Tem certeza que deseja deleta a tarefa?'}
        textoConfirmacao="Deletar"
        acao={async () =>
          {
            deleteItem()
            fecharModalConfirmacao()
          }
        }
      />
      <DataGrid
        rows={tasks}
        columns={columns}
        hideFooter={true}
        rowHeight={40}
        autoHeight
        onRowClick={async (row) => {
          // Já temos esses dados, mas fizemos uma nova requisição para mostrar o get por id funcionando
          await GetTask(String(row.id)).then((response) => {
            setTask(response.data)
          }).catch((err) => {
            createSnackbar('error', err.response.data.error)
          })
          handleClickOpen()
        }}
        disableColumnMenu
      />
      <ModalTask
        onClose={() => {
          handleClickClose();
        }}
        open={open}
        task={task}
      />
    </div>
  );
}
