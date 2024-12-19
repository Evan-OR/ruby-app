import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { createImageName, sendImageResquest, postOne, putOne } from '../lib/requests';
import dayjs from 'dayjs';

/**
 * @param {Object} props
 * @param {boolean} props.open
 * @param {Function} props.handleClose
 * @param {Function} props.updateData
 * @param {Object} event
 */
const EventModal = ({ open, handleClose, updateData, event = null }) => {
  const [dateTime, setDateTime] = useState(dayjs(new Date().toISOString()));
  const [formTitle, setTitle] = useState('');
  const [formDesc, setDesc] = useState('');
  const [formLoc, setLoc] = useState('');

  const imamgePickerRef = useRef(null);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const handleChange = (e, stateChange) => {
    stateChange(e.target.value);
  };

  const handleConfirm = async () => {
    if (!(formTitle && formDesc && formLoc && dateTime)) {
      alert('Please fill data for all fields!');
      return;
    }
    const request = event
      ? async () => putOne(event.id, formTitle, dateTime, formLoc, formDesc)
      : async () => await postOne(formTitle, dateTime, formLoc, formDesc);
    try {
      await updateData(request);
      const imageName = createImageName(formTitle, formDesc, formLoc);
      await sendImageResquest(imamgePickerRef.current.files[0], imageName);
      handleClose();
      setTitle('');
      setDesc('');
      setLoc('');
    } catch (e) {
      console.log(e);
      alert('Request failed :(');
    }
  };

  useEffect(() => {
    setDateTime(event ? dayjs(event.date) : dayjs(new Date().toISOString()));
    setTitle(event ? event.title : '');
    setDesc(event ? event.description : '');
    setLoc(event ? event.location : '');
  }, [event]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper sx={style}>
        <Box px={3} pt={3} pb={2} width={'450px'}>
          <Typography id="modal-modal-title" variant="h4" component="h2" textAlign={'center'} pb={2}>
            Event
          </Typography>
          <Box display={'flex'} flexDirection={'column'} gap={2}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={formTitle}
              onChange={(e) => handleChange(e, setTitle)}
              autoComplete="off"
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={formDesc}
              onChange={(e) => handleChange(e, setDesc)}
              autoComplete="off"
            />
            <TextField
              id="outlined-basic"
              label="Location"
              variant="outlined"
              value={formLoc}
              onChange={(e) => handleChange(e, setLoc)}
              autoComplete="off"
            />
            <DateTimePicker label="Controlled picker" value={dateTime} onChange={(newValue) => setDateTime(newValue)} />

            {!event && (
              <FormControl variant="outlined">
                <InputLabel htmlFor="input-with-icon-adornment" variant="outlined">
                  Thumbnail Image
                </InputLabel>
                <OutlinedInput
                  id="input-with-icon-adornment"
                  label="Thumbnail Image"
                  startAdornment={
                    <InputAdornment position="start">
                      <input
                        ref={imamgePickerRef}
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/png, image/jpeg"
                      />
                    </InputAdornment>
                  }
                />
              </FormControl>
            )}
          </Box>
          <Box display={'flex'} justifyContent={'space-evenly'} mt={2}>
            <Button onClick={handleClose} size="large" color="inherit">
              Cancel
            </Button>
            <Button onClick={handleConfirm} variant="contained" size="large">
              Confirm
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default EventModal;
