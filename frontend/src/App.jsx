import { useEffect, useState } from 'react';
import { getAll } from './lib/requests';
import EventDisplay from './components/EventDisplay';
import EventModal from './components/EventModal';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);
  const [eventToEdit, setEventToEdit] = useState(null);

  const getData = async () => {
    const res = await getAll();
    setData(res);
    setLoading(false);
  };

  const updateData = async (requestFunction) => {
    try {
      const res1 = await requestFunction();
      const res2 = await getData();
    } catch (error) {
      alert('FAILED IDK');
      console.log(error);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEventToEdit(null);
  };

  const openEditModal = (event) => {
    setEventToEdit(event);
    setModalOpen(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Typography variant="h4" textAlign={'center'} m={3}>
        Event Planner
      </Typography>
      <Button
        onClick={() => {
          setEventToEdit(null);
          setModalOpen(true);
        }}
      >
        Create New Event
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          {data.length > 0 ? (
            data.map((obj) => (
              <EventDisplay key={obj.id} event={obj} updateData={updateData} openEditModal={openEditModal} />
            ))
          ) : (
            <Typography variant="body1">No items in list</Typography>
          )}
        </Box>
      )}

      <EventModal open={modalOpen} handleClose={handleModalClose} updateData={updateData} event={eventToEdit} />
    </Box>
  );
}

export default App;
