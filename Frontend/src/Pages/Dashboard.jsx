import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Phone, Search, Send, User, Video, Camera, Edit2 } from "lucide-react"
import { useState } from "react"

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [activeTab, setActiveTab] = useState('chats')
  const [showProfile, setShowProfile] = useState(false)

  const chatUsers = [
    { id: 1, name: "Alice Johnson", status: "online", lastSeen: "Active now", lastMessage: "Hey, how's it going?" },
    { id: 2, name: "Bob Smith", status: "offline", lastSeen: "Last seen 2 hours ago", lastMessage: "Can we schedule a call?" },
    { id: 3, name: "Charlie Brown", status: "online", lastSeen: "Active now", lastMessage: "Did you see the latest update?" },
    { id: 4, name: "Diana Prince", status: "away", lastSeen: "Away for 30 minutes", lastMessage: "I'll get back to you soon" },
    { id: 5, name: "Ethan Hunt", status: "busy", lastSeen: "In a meeting", lastMessage: "Mission details are classified" },
  ]

  const callUsers = [
    { id: 1, name: "Frank Castle", status: "online", lastCall: "Yesterday, 15:30", callType: "video" },
    { id: 2, name: "Gwen Stacy", status: "offline", lastCall: "2 days ago", callType: "audio" },
    { id: 3, name: "Harry Potter", status: "online", lastCall: "Today, 10:00", callType: "video" },
    { id: 4, name: "Iris West", status: "away", lastCall: "3 days ago", callType: "audio" },
    { id: 5, name: "Jack Sparrow", status: "busy", lastCall: "1 week ago", callType: "video" },
  ]

  const chatMessages = {
    1: [
      { id: 1, sender: "Alice Johnson", message: "Hey, how's it going?" },
      { id: 2, sender: "You", message: "Hi Alice! I'm doing well, thanks for asking. How about you?" },
      { id: 3, sender: "Alice Johnson", message: "I'm great! Just finished a big project at work." },
      { id: 4, sender: "You", message: "That's awesome! Congratulations on completing the project." },
    ],
    2: [
      { id: 1, sender: "Bob Smith", message: "Can we schedule a call?" },
      { id: 2, sender: "You", message: "Sure, Bob. What time works best for you?" },
      { id: 3, sender: "Bob Smith", message: "How about tomorrow at 2 PM?" },
      { id: 4, sender: "You", message: "Sounds good. I'll send a calendar invite." },
    ],
    3: [
      { id: 1, sender: "Charlie Brown", message: "Did you see the latest update?" },
      { id: 2, sender: "You", message: "Not yet. What's new?" },
      { id: 3, sender: "Charlie Brown", message: "They added some cool new features to the app!" },
      { id: 4, sender: "You", message: "Awesome! I'll check it out right away." },
    ],
    4: [
      { id: 1, sender: "Diana Prince", message: "I'll get back to you soon" },
      { id: 2, sender: "You", message: "No problem, take your time." },
      { id: 3, sender: "Diana Prince", message: "Thanks for understanding. I'll be free in about an hour." },
      { id: 4, sender: "You", message: "Sounds good. Talk to you then!" },
    ],
    5: [
      { id: 1, sender: "Ethan Hunt", message: "Mission details are classified" },
      { id: 2, sender: "You", message: "Understood. When can we discuss?" },
      { id: 3, sender: "Ethan Hunt", message: "Secure line at 2200 hours." },
      { id: 4, sender: "You", message: "Roger that. I'll be ready." },
    ],
  }

  const userProfile = {
    name: "John Doe",
    username: "@johndoe",
    email: "john.doe@example.com",
    bio: "I'm a software developer passionate about creating amazing user experiences.",
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedUser(null)
    setShowProfile(false)
  }

  const handleProfileClick = () => {
    setShowProfile(true)
    setSelectedUser(null)
    setActiveTab('profile')
  }

  return (
    (<div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside
        className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative mb-4">
            <Search
              className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input placeholder="Search" className="pl-8" />
          </div>
          <nav className="flex space-x-2">
            <Button
              variant={activeTab === 'chats' ? 'default' : 'ghost'}
              className="flex-1 justify-center"
              onClick={() => handleTabChange('chats')}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Chats
            </Button>
            <Button
              variant={activeTab === 'calls' ? 'default' : 'ghost'}
              className="flex-1 justify-center"
              onClick={() => handleTabChange('calls')}>
              <Phone className="mr-2 h-4 w-4" />
              Calls
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              className="flex-1 justify-center"
              onClick={handleProfileClick}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </nav>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {activeTab === 'chats' && chatUsers.map((user) => (
              <div
                key={user.id}
                className={`flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                  selectedUser && selectedUser.id === user.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
                onClick={() => setSelectedUser(user)}>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                      user.status === 'online' ? 'bg-green-500' :
                      user.status === 'away' ? 'bg-yellow-500' :
                      user.status === 'busy' ? 'bg-red-500' : 'bg-gray-500'
                    }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.lastMessage}</p>
                </div>
              </div>
            ))}
            {activeTab === 'calls' && callUsers.map((user) => (
              <div
                key={user.id}
                className={`flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                  selectedUser && selectedUser.id === user.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
                onClick={() => setSelectedUser(user)}>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                      user.status === 'online' ? 'bg-green-500' :
                      user.status === 'away' ? 'bg-yellow-500' :
                      user.status === 'busy' ? 'bg-red-500' : 'bg-gray-500'
                    }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {user.callType === 'video' ? <Video className="inline mr-1 h-3 w-3" /> : <Phone className="inline mr-1 h-3 w-3" />}
                    {user.lastCall}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>
      <main className="flex-1 flex flex-col">
        {showProfile ? (
          <div className="flex-1 p-6 bg-white dark:bg-gray-800">
            <div className="max-w-2xl mx-auto">
              <div className="relative h-48 bg-blue-500 rounded-t-lg">
                <div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="relative">
                    <div
                      className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-800" />
                    <Button size="icon" className="absolute bottom-0 right-0 rounded-full">
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Change profile picture</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-16 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{userProfile.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{userProfile.username}</p>
              </div>
              <div className="mt-6 space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={userProfile.email}
                      className="flex-grow" />
                    <Button size="icon" variant="ghost" className="ml-2">
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit email</span>
                    </Button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bio
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <Textarea id="bio" name="bio" defaultValue={userProfile.bio} className="flex-grow" />
                    <Button size="icon" variant="ghost" className="ml-2 self-start">
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit bio</span>
                    </Button>
                  </div>
                </div>
                <div>
                  <Button className="w-full">Save Changes</Button>
                </div>
              </div>
            </div>
          </div>
        ) : selectedUser ? (
          <>
            <header
              className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                    selectedUser.status === 'online' ? 'bg-green-500' :
                    selectedUser.status === 'away' ? 'bg-yellow-500' :
                    selectedUser.status === 'busy' ? 'bg-red-500' : 'bg-gray-500'
                  }`} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{selectedUser.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedUser.status}</p>
              </div>
            </header>
            {activeTab === 'chats' ? (
              <>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {chatMessages[selectedUser.id].map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                          }`}>
                          {message.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <footer
                  className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
                  <form className="flex space-x-2">
                    <Input placeholder="Type a message" className="flex-1" />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </form>
                </footer>
              </>
            ) : (
              <div
                className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Button className="mr-2">
                  <Phone className="mr-2 h-4 w-4" />
                  Audio Call
                </Button>
                <Button>
                  <Video className="mr-2 h-4 w-4" />
                  Video Call
                </Button>
              </div>
            )}
          </>
        ) : (
          <div
            className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <p className="text-gray-500 dark:text-gray-400">
              {activeTab === 'chats' ? 'Select a chat to start messaging' : 
               activeTab === 'calls' ? 'Select a contact to start a call' : 
               'Click on Profile to view your profile'}
            </p>
          </div>
        )}
      </main>
    </div>)
  );
}