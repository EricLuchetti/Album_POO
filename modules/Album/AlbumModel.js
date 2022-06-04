export default class AlbumModel {

    storageName;

    constructor() {

        this.storageName = 'imagens';
        this.local = localStorage;
    }

    getImagens() {
        try {
            let imagens = this.local.getItem(this.storageName) ? JSON.parse(this.local.getItem(this.storageName)) : [];

            return imagens;
        } catch (error) {
            throw error;
        }
    }

    setDataImagem() {
        try {

            let dados = {
                imagem: document.getElementById('base64').value
            };

            return dados;
        } catch (error) {
            throw error;
        }
    }

    create() {
        try {
            let dados = albumModel.setDataImagem();
            let imagens = albumModel.getImagens();
            imagens.push(dados);

            this.local.setItem(this.storageName, JSON.stringify(imagens));

        } catch (error) {
            throw error;
        }
    }

    deleted(index) {
        try {
            let imagens = this.local.getItem(this.storageName) ? JSON.parse(this.local.getItem(this.storageName)) : [];

            imagens.splice(index, 1);

            this.local.setItem(this.storageName, JSON.stringify(imagens));

        } catch (error) {
            throw error;
        }
    }

    deletarAlbum() {
        try {
            let exclusaoTotal = confirm(`Tem certeza de que deseja excluir TODAS as fotos ? `)
            if (exclusaoTotal == true) {

                localStorage.clear();

            }

        } catch (error) {
            throw error;
        }
    }

}

const albumModel = new AlbumModel();