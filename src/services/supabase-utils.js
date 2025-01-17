import { client } from './client';

export async function getUser() {
  return (await client.auth.session()) && (await client.auth.session().user);
}

export async function signIn(email, password) {
  const { user } = await client.auth.signIn({ email, password });
  return user;
}

export async function signUp(email, password) {
  const { user } = await client.auth.signUp({ email, password });
  return user;
}

export async function logout() {
  await client.auth.signOut();
  return (window.location.href = '../');
}

export async function getFavoriteHomes() {
  const { body } = await client.from('saved').select('*');

  return body;
}

export async function getProfileByID(id) {
  const { body } = await client.from('profiles').select('*').match({ user_id: id }).single();

  return body;
}

export async function getFilters() {
  const user = await getUser();
  const profile = await getProfileByID(user.id);
  try {
    const { body } = await client.from('filters').select('*').match({ profile_id: profile.id });
    return body;
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
}

export async function createProfile({ username }, user_id) {
  const { body } = await client.from('profiles').insert({ username, user_id });

  return body;
}

export async function createFilter({ zip_code, low_price, high_price }, user_id) {
  const profile = await getProfileByID(user_id);
  const { body } = await client
    .from('filters')
    .insert({ zip_code, low_price, high_price, profile_id: profile.id });
  return body;
}

export async function updateFilter({ zip_code, low_price, high_price, id }) {
  const { body } = await client
    .from('filters')
    .update({ zip_code, low_price, high_price })
    .match({ id });
  return body;
}
export async function updateProfile({ username, id }) {
  const { body } = await client.from('profiles').update({ username }).match({ id });

  return body;
}

export async function createSavedHome(savedHome) {
  const { body } = await client.from('saved').insert(savedHome);

  return body;
}

export async function deleteSavedHome(property_id) {
  const { body } = await client.from('saved').delete().match({ property_id });

  return body;
}

export async function uploadAvatar(imageFile) {
  const { body } = await client.storage.from('avatar').upload(imageFile, {
    cacheControl: '3600',
    upsert: true,
  });
  return body;
}
