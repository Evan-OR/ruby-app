export const getAll = async () => {
  try {
    const req = await fetch('/api/events');
    const json = await req.json();
    return json;
  } catch (error) {
    console.error('fuck shit');
  }
};

export const getOne = async (id) => {
  try {
    const req = await fetch(`/api/events/${id}`);
    const json = await req.json();
    return json;
  } catch (error) {
    console.error('fuck shit');
  }
};

export const postOne = async (title, date, location, description) => {
  try {
    const req = await fetch(`/api/events`, {
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
    console.error('fuck shit');
  }
};
export const putOne = async (id, title, date, location, description) => {
  try {
    const req = await fetch(`/api/events/${id}`, {
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
    console.error('fuck shit');
  }
};

export const deleteOne = async (id) => {
  try {
    const req = await fetch(`/api/events/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('fuck shit');
  }
};

export const sendImageResquest = async (file, customFileName) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('customFileName', customFileName);

    const req = await fetch('/api/images', {
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
