const socket = io();

socket.on('connect', () =>
{
    console.log('Connected to server');
});

socket.on('disconnect', () =>
{
    console.log('Disconnected from server');
});

socket.on('data', (data) =>
{
    document.querySelector('#data').textContent = JSON.stringify(data);
});