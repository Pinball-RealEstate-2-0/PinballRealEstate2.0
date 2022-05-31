import React, { useEffect, useState } from 'react';
import { getUser, getProfileByID, getFilters, updateFilter, updateProfile } from '../services/supabase-utils';
import CustomMenu from './CustomMenu';
import './Profile.css';
export default function Profile() {
  const [profile, setProfile] = useState('');
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [visibleNameForm, setVisibleNameForm] = useState(false);
  const [filters, setFilters] = useState({
    zip_code: 0,
    low_price: 0,
    high_price: 0,
    id:0
  });
  useEffect(() => {
    async function getProfileOnLoad(){
      const { id } = await getUser();
      const profileData = await getProfileByID(id);
      const filterData = await getFilters();
      setProfile(profileData);
      setFilters({
        zip_code: filterData.zip_code,
        low_price: filterData.low_price,
        high_price: filterData.high_price,
        id: filterData.id
      }); 
    }
    return getProfileOnLoad;
  }, []);

  async function handleFilterChange(e){
    e.preventDefault();
    await updateFilter(filters);
    setVisibleFilter(false);
  }
  function handleFilterVisible(){
    if (visibleFilter === false){
      setVisibleFilter(true);
    } else {
      setVisibleFilter(false);
    }
  }
  async function handleNameChange(e) {
    e.preventDefault();
    await updateProfile(profile);
    setVisibleNameForm(false);
  }
  function handleEditNameVisible(){
    if (visibleNameForm === false){
      setVisibleNameForm(true);
    } else {
      setVisibleNameForm(false);
    }
  }

  return (
    <div>
      <header>
        <CustomMenu/>
      </header>
      <div className='profile'>
        <div className='avatar-username'>
          <img src='https://placedog.net/200'/>
          <h2>Username: {profile.username}</h2>
          <button onClick={handleEditNameVisible}>Change User Name?</button>
        </div>
        <form className='' onSubmit={handleNameChange}>
          { visibleNameForm &&       
            <label>
          Edit User Name
              <input value={profile.username} onChange={e => setProfile({ ...profile, username: e.target.value })}></input>
              <button onClick={handleNameChange}>Change Name</button>
            </label>}          
        </form>
        <div className='filters-div'>
          <div className='current-filters'>
            <label>Zip Code: {filters.zip_code}</label>
            <label>Low Price: ${filters.low_price}</label>
            <label>High Price: ${filters.high_price}</label>
            <button onClick={handleFilterVisible}>Update Filters</button><br/>
            <br/>
          </div>
          <br/>
          <div className='filter-form'>
            <form onSubmit={handleFilterChange}>       
              { visibleFilter && 
            <div> 
              <label>
              Zip Code 
                <input value={filters.zip_code} onChange={e => setFilters({ ...filters, zip_code: e.target.value })}></input>
              </label>
              <label>
              Low Price
                <input value={filters.low_price} onChange={e => setFilters({ ...filters, low_price: e.target.value })}></input>
              </label>
              <label>
              High Price
                <input value={filters.high_price} onChange={e => setFilters({ ...filters, high_price: e.target.value })}></input>
              </label>
              <button onClick={handleFilterChange}>Update</button>
            </div>            
              }
            </form>
          </div>
        </div>
        
        <div className='cards'>Saved home cards here</div>
      </div>
    </div>
  );
}
