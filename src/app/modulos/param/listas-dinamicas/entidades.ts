export class Model{
    varhistorial: any = [];
    varhistorialTemp: any = [];
    modal: any;
    detalleModal: any;
    ldetalleModal: any;
    title = "";
    isCrear: any;

    varLista: any = {
        nombre_lista_id: 0,
        nombre_lista: "",
        activo: true,
        usuario: ""
    }

    varListaDetalle: any = {
        lista_dinamica_id: 0,
        nombre_lista_id: 0,
        lista_dinamica: "",
        codigo: "",
        lista_padre_id: 0,
        activo: true,
        usuario: ""
    }

    varhistorialDetalle: any = [];
    varhistorialDetalleTemp: any = [];

    lstListaDetalleFull: any = [];
}