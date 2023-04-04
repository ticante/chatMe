const CLIENT_ID = 'sDc51UU3TuMvWYw3';
const roomName = 'observable-room';
const drone = new ScaleDrone('sDc51UU3TuMvWYw3', {
  data: { // Will be sent out as clientData via events
    name: getRandomName(),
  },
}); 

      drone.on('open', error => {
            if (error) {
                return console.error(error);
            }
            console.log('Successfully connected to Scaledrone');
            const room = drone.subscribe('observable-room');
            room.on('open', error => {
                if (error) {
                    return console.error(error);
                }
                console.log('Successfully joined room');
            });
            room.on('members', members => {
              const memberCount = document.querySelector('.member-count');
              memberCount.innerHTML = `${members.length} online`;
              updateMemberList(members);
            });

            room.on('members', members => {
                const memberCount = document.querySelector('.member-count');
                memberCount.innerHTML = `${members.length} online`;
                const memberList = document.querySelector('.member-list');
                memberList.innerHTML = '';
                members.forEach(member => {
                    const memberElement = document.createElement('li');
                    memberElement.textContent = member.clientData.name;
                    memberList.appendChild(memberElement);
                });
                room.on('member_join', member => {
                  const memberList = document.querySelector('.member-list');
                  const memberElement = document.createElement('li');
                  memberElement.textContent = member.clientData.name;
                  memberList.appendChild(memberElement);
                  const memberCount = document.querySelector('.member-count');
                  memberCount.innerHTML = `${room.members.length} online`;
                });
            });
            const messageForm = document.querySelector('.msger-inputarea');
            const messageInput = document.querySelector('.msger-input');
            const messagesDiv = document.querySelector('.msger-chat');
            messageForm.addEventListener('submit', () => {
                const message = messageInput.value;
                if (message.trim() == '') {
                    return false;
                }
                drone.publish({
                    room: 'observable-room',
                    message
                });
                messageInput.value = '';
            });
            room.on('data', (data, member) => {
                const messageElement = createMessageElement(member.clientData.name, PERSON_IMG, data);
                messagesDiv.appendChild(messageElement);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            });
        });

        function createMessageElement(member, img, text) {
            const msgDiv = document.createElement("div");
            msgDiv.classList.add("msg");
            const msgImgDiv = document.createElement("div");
            msgImgDiv.classList.add("msg-img");
            msgImgDiv.style.backgroundImage = `url(${img})`;
            msgImgDiv.appendChild
        }


        function getRandomName() {
            const adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
            const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
            return (
              adjs[Math.floor(Math.random() * adjs.length)] +
              "_" +
              nouns[Math.floor(Math.random() * nouns.length)]
            );
          }
          
          function getRandomColor() {
            return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
          }       
    
          
          function getRandomAvatar() {
            var images = [
              './images/avatar-man-with-mustages-1632966.jpg',
              './images/geek-avatar-1632962.jpg',
              './images/man-avatar-1632965.jpg',
              './images/woman-avatar-1632963.jpg',
            ];
          
            var randomIndex = Math.floor(Math.random() * images.length);
            return images[randomIndex];
          }


  function createMessageElement(member, img, text) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("msg");
    
    //BUBBLE
    const msgBubbleDiv = document.createElement("div");
    msgBubbleDiv.classList.add("msg-bubble");
    msgDiv.appendChild(msgBubbleDiv);
  
    //INFO
    const msgInfoDiv = document.createElement("div");
    msgInfoDiv.classList.add("msg-info");
    msgBubbleDiv.appendChild(msgInfoDiv);
  
    //NAME
    const msgInfoNameDiv = document.createElement("div");
    msgInfoNameDiv.classList.add("msg-info-name");
    msgInfoNameDiv.appendChild(document.createTextNode(member));
    msgInfoNameDiv.style.color = getRandomColor;
    msgInfoDiv.appendChild(msgInfoNameDiv);
  
    const msgInfoTimeDiv = document.createElement("div");
    msgInfoTimeDiv.classList.add("msg-info-time");
    msgInfoTimeDiv.textContent = currentTime(new Date());
    msgInfoDiv.appendChild(msgInfoTimeDiv);
  
    //TEXT
    const msgTextDiv = document.createElement("div");
    msgTextDiv.classList.add("msg-text");
    msgTextDiv.appendChild(document.createTextNode(text));
    msgBubbleDiv.appendChild(msgTextDiv);

    return msgDiv;
  }     
  
  function currentTime(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
  
    return `${h.slice(-2)}:${m.slice(-2)}`;
  }

  function createMemberElement(member) {
    const memberDiv = document.createElement("div");
    memberDiv.classList.add("member");
    memberDiv.appendChild(document.createTextNode(member[0].toUpperCase())); 
    return memberDiv;

} 

function updateMemberList(members) {
  const memberList = document.querySelector('.member-list');
  memberList.innerHTML = '';
  members.forEach(member => {
    const memberElement = document.createElement('li');
    memberElement.textContent = member.clientData.name;
    memberList.appendChild(memberElement);
  });
}


document.querySelector(".msger-send-btn").addEventListener("click", function() {
  document.querySelector(".logo").classList.add("rotate");
});
const PERSON_IMG = function randomAvatar() {
  
}