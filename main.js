const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data');
const templateGenerator = require('./app/template');
let tray = null;

app.on('ready', () =>{
    console.log('Aplicação Iniciada!');
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    });
    
    tray = new Tray(__dirname + '/app/img/icon-tray.png'); //icon na barra Tray
    let template = templateGenerator.geraTrayTemplate();
    let trayMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(trayMenu);

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
    app.quit();
});

let sobreWindow = null;
ipcMain.on('abrir-janela-sobre', () => {
    if(sobreWindow == null){
        sobreWindow = new BrowserWindow({
            width: 300,
            height: 220,
            alwaysOnTop: true, //Verificar porque não está funcionando!!!!
            frame: false
        });

        sobreWindow.on('closed', () => {
            sobreWindow = null;
        });
    }

    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close();
});

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
    data.salvaDados(curso, tempoEstudado);
    console.log(`O curso ${curso} foi estudado por ${tempoEstudado}`);
});




















