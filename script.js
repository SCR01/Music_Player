// script.js

const songs = [
    { id: 1, name: 'Angaaron', artist: 'Shreya Ghoshal', img: 'images/angaaron.jpg', genre: 'rock', source: 'music/Angaaron.mp3' },
    { id: 2, name: 'Satyanaas', artist: 'Arijit Singh', img: 'images/satyanaas.jpg', genre: 'pop', source: 'music/Satyanaas.mp3' },
    { id: 3, name: 'Arjan-vally', artist: 'Bhupinder Babal', img: 'images/arjan-vailly.jpg', genre: 'hip-hop', source: 'music/Arjan-Vailly.mp3'},
    { id: 4, name: 'deva-deva', artist: 'Arijit Singh', img: 'images/deva-deva.jpg', genre: 'jazz', source: 'music/Deva-Deva.mp3' },
    { id: 5, name: 'Pagal-Guru', artist: 'Guru Randhawa', img: 'images/Pagal-Guru.jpg', genre: 'pop', source: 'music/Pagal.mp3' },
  { id: 6, name: 'Ami-je-Tomar', artist: 'Arijit Singh', img: 'images/ami-je-tomar.jpg', genre: 'jazz', source: 'music/Ami-je-tomar.mp3' }
 
  ];
  
  let currentSongIndex = 0;
  let playlists = {};
  let currentPlaylist = [];
  
  // Toggle theme function
  document.getElementById('toggleTheme').addEventListener('click', () => {
    const body = document.body;
    body.dataset.theme = body.dataset.theme === 'light' ? 'dark' : 'light';
    document.getElementById('toggleTheme').textContent = body.dataset.theme === 'light' ? 'Dark' : 'Light';
  });
  
  // Show songs function
  function showSongs(genre = 'all') {
    const allSongsDiv = document.getElementById('allSongs');
    allSongsDiv.innerHTML = '';
    const filteredSongs = genre === 'all' ? songs : songs.filter(song => song.genre === genre);
    filteredSongs.forEach(song => {
      const songButton = document.createElement('button');
      songButton.textContent = `${song.name} - ${song.artist}`;
      songButton.addEventListener('click', () => {
        currentSongIndex = songs.findIndex(s => s.id === song.id);
        renderCurrentSong();
      });
      allSongsDiv.appendChild(songButton);
    });
  }
  
  // Render current song
  function renderCurrentSong() {
    const song = songs[currentSongIndex];
    document.getElementById('songImg').src = song.img;
    document.getElementById('songName').textContent = song.name;
    document.getElementById('artistName').textContent = song.artist;
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = song.source;
    audioPlayer.play();
  }
  
  // Add to playlist
  document.getElementById('addToPlaylist').addEventListener('click', () => {
    const song = songs[currentSongIndex];
    currentPlaylist.push(song);
    renderPlaylistSongs();
  });
  
  // Render playlist songs
  function renderPlaylistSongs() {
    const playlistSongsDiv = document.getElementById('playlistSongs');
    playlistSongsDiv.innerHTML = '';
    currentPlaylist.forEach(song => {
      const songElement = document.createElement('div');
      songElement.textContent = `${song.name} - ${song.artist}`;
      playlistSongsDiv.appendChild(songElement);
    });
  }
  
  // Create playlist
  document.getElementById('createPlaylist').addEventListener('click', () => {
    const playlistName = document.getElementById('newPlaylistName').value.trim();
    if (playlistName && !playlists[playlistName]) {
      playlists[playlistName] = [];
      renderPlaylists();
      document.getElementById('newPlaylistName').value = '';
    }
  });
  
  // Render playlists
  function renderPlaylists() {
    const playlistsDiv = document.getElementById('playlists');
    playlistsDiv.innerHTML = '';
    for (const playlistName in playlists) {
      const playlistElement = document.createElement('div');
      playlistElement.textContent = playlistName;
      playlistElement.addEventListener('click', () => {
        currentPlaylist = playlists[playlistName];
        renderPlaylistSongs();
      });
      playlistsDiv.appendChild(playlistElement);
    }
  }
  
  // Next song
  document.getElementById('nextSong').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    renderCurrentSong();
  });
  
  // Previous song
  document.getElementById('prevSong').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    renderCurrentSong();
  });
  
  // Genre filter change event
  document.getElementById('genreFilter').addEventListener('change', (e) => {
    showSongs(e.target.value);
  });
  
  // Initial render
  showSongs();
  renderCurrentSong();
  renderPlaylists();
  
  let favSongs = [
    // Add specific songs to the favorite songs playlist
    songs.find(song => song.name === 'Ami-je-yomar'),
    songs.find(song => song.name === 'Arjan-Vailly'),
    songs.find(song => song.name === 'Pagal')
];

let currSongs = [
    // Add songs you listen to in the current songs playlist
    songs.find(song => song.name === 'Song Name 1'), // Replace with the actual song name
    songs.find(song => song.name === 'Song Name 2'), // Replace with the actual song name
    // Add more songs as needed
];


// Initial render
showSongs();
renderCurrentSong();

// Render favorite songs playlist