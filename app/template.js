const data = require('../data');
const { ipcMain } = require('electron');

module.exports = {
    
    templateInicial: null,

    geraTrayTemplate(win){
        let template = [
            {
                label: 'Curso'
            },
            {
                type: 'separator'
            }
        ];

        let cursos = data.pegaNomeDosCursos();
        cursos.forEach((curso) => {
            let menuItem = {
                label: curso,
                type: 'radio',
                click: () => {
                    win.send('curso-trocado', curso);
                }
            }
            template.push(menuItem);
        })

        this.templateInicial = template;
        return template;
        
    },
    adicionaCursoNoTray(curso, win){
        this.templateInicial.push({
            label: curso,
            type: 'radio',
            checked: true,
            click: () => {
                win.send('curso-trocado', curso);
            }
        })

        return this.templateInicial;
    },
    geraMenuPrincipalTemplate(app){

    let templateMenu = [{
        label: 'Edit',
        submenu: [
          {role: 'undo'},
          {role: 'redo'},
          {type: 'separator'},
          {role: 'cut'},
          {role: 'copy'},
          {role: 'paste'},
          {role: 'pasteandmatchstyle'},
          {role: 'delete'},
          {role: 'selectall'}
        ]
      },
      {
        label: 'View',
        submenu: [
          {role: 'reload'},
          {role: 'forcereload'},
          {role: 'toggledevtools'},
          {type: 'separator'},
          {role: 'resetzoom'},
          {role: 'zoomin'},
          {role: 'zoomout'},
          {type: 'separator'},
          {role: 'togglefullscreen'}
        ]
      },
      {
        role: 'window',
        submenu: [
            {
                role: 'minimize',
                accelerator: 'Alt+M'
            },
            {
                role: 'close'
            }
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click () { require('electron').shell.openExternal('https://electron.atom.io') }
          }
        ]
      },
      {
        label: 'Sobre',
        submenu: [
            {
                label: 'Sobre o Timer',
                accelerator: 'CmdOrCtrl+I',
                click: () => {
                    ipcMain.emit('abrir-janela-sobre');
                }
            }
        ]
    }];
    if( process.platform == 'darwin' ){
        templateMenu.unshift({
            label: app.getName(),
            submenu: [
                {
                label: 'Estou rodando no Mac!'
                }
            ]
        });
    }
    return templateMenu;
    }
}