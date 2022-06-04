import AlbumModel from "./AlbumModel.js";

export default class AlbumController {

    albumModel;

    constructor() {
    }

    setDataImagem() {
        let albumModel = new AlbumModel();
        let dados = albumModel.setDataImagem();

        return dados;
    }

    create() {
        try {
            let albumModel = new AlbumModel();
            let imagem = albumModel.create();

            return imagem;
        } catch (error) {
            throw error;
        }
    }

    deleted(index) {
        try {
            let albumModel = new AlbumModel();
            let deletar = albumModel.deleted(index);

            return deletar;

        } catch (error) {
            console.log(error);

            throw error;
        }
    }

    getImagens() {
        try {
            let albumModel = new AlbumModel();
            let imagens = albumModel.getImagens();

            return imagens;
        } catch (error) {
            throw error;
        }
    }

    deletarAlbum() {
        try {
            let albumModel = new AlbumModel();
            let deletarAlbum = albumModel.deletarAlbum();

            return deletarAlbum;
        } catch (error) {
            throw error;
        }
    }

}

const albumController = new AlbumController();