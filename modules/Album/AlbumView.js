import AlbumController from "./AlbumController.js";

export default class AlbumView {

    albumController;

    constructor() {

    }

    getImagens() {
        try {
            let albumController = new AlbumController();
            let albumImagens = albumController.getImagens();

            return albumImagens;
        } catch (error) {
            console.log(error);
        }
    }

    validate() {
        try {
            let base64 = {};
            base64.valor = document.getElementById('base64').value;

            if (!base64.valor) {
                alert('Por favor, selecione uma imagem');

                throw new Error;
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    create() {
        try {
            setTimeout(() => {
                let albumController = new AlbumController();
                let dados = albumController.setDataImagem();
                let base64 = document.getElementById('base64').value;

                if (albumView.validate(dados), base64 != '') {
                    albumController.create();

                    albumView.read();
                    albumView.limparInfo();

                }

            }, 100);

        } catch (error) {
            console.log(error);
        }
    }

    deleted(index) {
        try {
            let albumController = new AlbumController();

            let confirmacao = confirm(`Tem certeza de que deseja excluir?`);
            if (confirmacao == true) {
                albumController.deleted(index);

                albumView.read();
            }
        } catch (error) {
            console.log(error);

            throw error;
        }

    }

    deletarAlbum() {
        try {
            let albumController = new AlbumController();

            albumController.deletarAlbum();

            albumView.read();

        } catch (error) {
            console.log(error);
        }
    }

    read() {
        try {
            let albumController = new AlbumController();
            let albumImagens = albumController.getImagens();
            let retorno = ``;
            let index = 0;

            for (let item of albumImagens) {
                retorno += `                 
                <div class="foto-legenda" data-bs-toggle="modal" data-bs-target="#modal${index}">
                    <img src="${item.imagem}" class="small-img" data-bs-toggle="modal" data-bs-target="#modal${index}" id="imagem${index}"> 
                    <figcaption>Imagem ${index + 1}</figcaption>           
                </div>
                `;

                index++;
            }

            albumView.readModal();

            setTimeout(() => {
                let images = albumView.getImagens();

                for (let i = 0; i < images.length; i++) {
                    document.getElementById(`excluirImagem-${i}`).addEventListener('click', function(button) {
                        let id = button.target.getAttribute('data-id');

                        albumView.deleted(id);
                    });

                }
            }, 1000);

            document.getElementById('album').innerHTML = retorno;

        } catch (error) {
            console.log(error);
        }
    }

    readModal() {
        try {
            let albumController = new AlbumController();
            let albumImagens = albumController.getImagens();
            let retornoModal = ``
            let index = 0;

            for (let item of albumImagens) {

                retornoModal += `
                <div class="modal fade" id="modal${index}" tabindex="-1" data-bs-backdrop="static" aria-labelledby="modalLabel"
                aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-xl">
                        <div class="modal-content" style="background-color: rgba(0, 0, 0, 0.8); padding: 1px, 1px, 1px">
                            <div class="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close"></button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                                    id="excluirImagem-${index}" data-id="${index}">Excluir</button>
                            </div>
                            <div class="modal-body">
                                <img class="modal-img" src="${item.imagem}">
                            </div>
                            <div class="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
                `

                index++;
            }

            document.getElementById('modal').innerHTML = retornoModal;

        } catch (error) {
            console.log(error);
        }
    }

    limparInfo() {
        try {
            let limpar = {}
            limpar.base64 = document.getElementById('base64').value = null;
            limpar.file = document.getElementById('imagemFile').value = null;
            limpar.imagem = document.getElementById('imagem').src = '';

            return limpar;
        } catch (error) {
            throw error;
        }

    }


    //---------------------------------------------------------------------------------------------------------------------------------------------------------------//

    previewFile(event) {
        try {
            let reader = new FileReader();
            let file = event.target.files[0];

            reader.readAsDataURL(file);
            reader.onloadend = () => {
                preview.src = reader.result;
                document.getElementsByTagName("textarea")[0].value = reader.result;
            }
        } catch (error) {
            alert(error.message)
        }
    }

    convertBase64(event) {
        try {
            let file = {}
            file.valor = event.target.value.replace(/^data:image\/[a-z]+;base64,/, "");
            preview.src = `data:image/png;base64,${file}`;

            return file;
        } catch (error) {
            alert(error.message);
        }
    }

    previewImage() {
        try {
            let a = document.createElement("a");
            a.href = preview.src;

        } catch (error) {
            alert(error.message);
        }
    }

}

const albumView = new AlbumView();

let preview = document.querySelector('img');

document.getElementsByTagName("input")[0].addEventListener('change', albumView.previewFile);
document.getElementsByTagName("input")[0].addEventListener('change', albumView.previewImage);
document.getElementsByTagName("input")[0].addEventListener('change', albumView.create);
document.getElementsByTagName("textarea")[0].addEventListener('input', albumView.convertBase64);
document.getElementById("deletarAlbum").addEventListener('click', albumView.deletarAlbum);

window.onload = function() {
    albumView.read();
}