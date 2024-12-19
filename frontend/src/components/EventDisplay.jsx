import React from 'react';
import { Box, Divider, Paper, Typography, IconButton } from '@mui/material';
import { createImageName, deleteOne } from '../lib/requests';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

/**
 * @typedef {Object} Event
 * @property {number} id
 * @property {string} title
 * @property {string} date
 * @property {string} location
 * @property {string} description
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 *
 * @param {Event} event
 * @param {Function} updateData
 * @returns {void}
 */
const EventDisplay = ({ event: { id, title, date, description, location }, updateData, openEditModal }) => {
  const convertedDate = new Date(date).toLocaleDateString('en-IE');
  // /images/show?file_path=example.jpg
  return (
    <Paper
      sx={{
        width: '340px',
        margin: '8px',
        '.iconWrapper': {
          opacity: 0.3,
        },
        '&:hover .editIcon': {
          color: 'primary.main',
        },
        '&:hover .deleteIcon': {
          color: 'error.main',
        },
        '&:hover .iconWrapper': {
          opacity: 1,
        },
      }}
    >
      <Box display={'flex'} flexDirection={'column'} pt={2} pb={1} px={2}>
        {id}
        <img
          src={`http://localhost:3000/images/show?file_path=${createImageName(title, description, location)}.jpg`}
        ></img>
        <Typography variant="h6" fontWeight={'bold'} textTransform={'capitalize'}>
          {title}
        </Typography>
        <Divider />
        <Typography variant="body1" fontWeight={100} py={1} textTransform={'capitalize'}>
          {description}
        </Typography>

        <Box display={'flex'} justifyContent={'space-between'} sx={{ opacity: 0.7 }}>
          <Typography variant="body2" textTransform={'capitalize'}>
            {location}
          </Typography>
          <Typography variant="body2">{convertedDate}</Typography>
        </Box>

        <Box display={'flex'} justifyContent={'space-between'} className="iconWrapper">
          <Box>
            <IconButton className="deleteIcon" aria-label="delete" onClick={() => updateData(() => deleteOne(id))}>
              <DeleteIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              className="editIcon"
              aria-label="delete"
              onClick={() => openEditModal({ id, title, date, description, location })}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default EventDisplay;
