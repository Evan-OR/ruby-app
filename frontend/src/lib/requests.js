export const getAll = async () => {
  try {
    const req = await fetch('/events');
    const json = await req.json();
    return json;
  } catch (error) {
    console.error('error');
  }
};

export const getOne = async (id) => {
  try {
    const req = await fetch(`/events/${id}`);
    const json = await req.json();
    return json;
  } catch (error) {
    console.error('error');
  }
};

export const postOne = async (title, date, location, description) => {
  try {
    const req = await fetch(`/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: {
          title,
          date,
          location,
          description,
        },
      }),
    });
    const json = await req.json();
    return json;
  } catch (error) {
    console.error('error');
  }
};
export const putOne = async (id, title, date, location, description) => {
  try {
    const req = await fetch(`/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: {
          title,
          date,
          location,
          description,
        },
      }),
    });
    const json = await req.json();
    return json;
  } catch (error) {
    console.error('error');
  }
};

export const deleteOne = async (id) => {
  try {
    const req = await fetch(`/events/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('error');
  }
};

export const sendImageResquest = async (file, customFileName) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('customFileName', customFileName);

    const req = await fetch('/images', {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    console.error('FAILED TO SEND IMAGE');
  }
};

export const createImageName = (title, desc, location) => {
  return `${title}${desc}${location}`.replace(/ /g, '');
};
