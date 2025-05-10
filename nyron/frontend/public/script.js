document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send');
    const messagesContainer = document.getElementById('messages');
    const profileSettings = document.querySelector('.profile-settings');
    const profileDropdown = document.getElementById('profile-dropdown');
    const settingsContainer = document.getElementById('settings-container');
    const settingsCategories = document.querySelectorAll('.settings-category');
    const settingsCloseBtn = document.querySelector('.settings-close-btn');
    const sidemenuSettings = document.getElementById('sidemenu-settings');
    const dropdownSettings = document.getElementById('dropdown-settings');

    function addMessageToUI(text, isSent) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        if (isSent) {
            messageDiv.classList.add('sent');
        }

        const timeSpan = document.createElement('span');
        timeSpan.classList.add('message-time');
        const now = new Date();
        
        const username = isSent ? 'You' : 'Username';
        timeSpan.textContent = `${username} • ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        messageDiv.appendChild(timeSpan);

        const messageTextSpan = document.createElement('span');
        messageTextSpan.textContent = text;
        messageDiv.appendChild(messageTextSpan);
        
        messagesContainer.appendChild(messageDiv);

        requestAnimationFrame(() => {
            messageDiv.classList.add('message-appear');
        });

        messagesContainer.parentElement.scrollTop = 0;
    }

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            addMessageToUI(messageText, true);
            messageInput.value = '';
            messageInput.focus();
        }
    }

    sendButton.addEventListener('click', sendMessage);

    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    profileSettings.addEventListener('click', (event) => {
        event.stopPropagation();
        profileDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        profileDropdown.classList.remove('show');
    });

    function showSettings() {
        settingsContainer.classList.remove('hidden');
        setTimeout(() => {
            settingsContainer.classList.add('visible');
        }, 10);
        profileDropdown.classList.remove('show');
    }

    function hideSettings() {
        settingsContainer.classList.remove('visible');
        setTimeout(() => {
            settingsContainer.classList.add('hidden');
        }, 300);
    }

    sidemenuSettings.addEventListener('click', showSettings);
    dropdownSettings.addEventListener('click', showSettings);
    settingsCloseBtn.addEventListener('click', hideSettings);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hideSettings();
        }
    });

    settingsCategories.forEach(category => {
        category.addEventListener('click', () => {
            settingsCategories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');
        });
    });
});
