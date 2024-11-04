import { useState } from 'react';
import './App.css';
import { Button } from './components/Button';
import { FormAddFriend } from './components/FormAddFriend';
import { FormSplit } from './components/FormSplit';
import { FriendsList } from './components/FriendsList';

const initialFriends = [
  { id: '118836', name: 'Clark', image: 'https://i.pravatar.cc/48?u=118836', balance: 0 },
  { id: '933372', name: 'Sarah', image: 'https://i.pravatar.cc/48?u=933372', balance: 0 },
  { id: '499476', name: 'Anthony', image: 'https://i.pravatar.cc/48?u=499476', balance: 0 },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) => (friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + value } : friend))
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? 'Close' : 'Add friend'}</Button>
      </div>
      {selectedFriend && (
        <FormSplit
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

export default App;
