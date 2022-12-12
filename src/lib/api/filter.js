async function getByFilter({
  page = 0,
  country = null,
  season = null,
  sort = 0,
  studio = null,
  age_ratings = [],
  category_id = null,
  end_year = null,
  episode_duration_from = null,
  episode_duration_to = null,
  episodes_from = null,
  episodes_to = null,
  genres = [],
  profile_list_exclusions = [],
  start_year = null,
  status_id = null,
  types = [],
  is_genres_exclude_mode_enabled = false
}) {
  const data = {
    country,
    season,
    sort,
    studio,
    age_ratings,
    category_id,
    end_year,
    episode_duration_from,
    episode_duration_to,
    episodes_from,
    episodes_to,
    genres,
    profile_list_exclusions,
    start_year,
    status_id,
    types,
    is_genres_exclude_mode_enabled
  }

  const response = await fetch(
    `${import.meta.env.VITE_FULL_API_URL}/filter/${page}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  )
  const json = await response.json()
  return json
}

export { getByFilter }
