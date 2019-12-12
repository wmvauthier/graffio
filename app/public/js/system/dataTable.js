function dataTable() {
    
    $('#no-more-tables').dataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ resultados por página",
            "zeroRecords": "Nenhum registro foi encontrado",
            "info": "Exibindo _PAGE_ de _PAGES_",
            "infoEmpty": "Não existem registros",
            "infoFiltered": "(filtrado de _MAX_ registros)",
            "search": "Filtrar por:",
            "paginate": {
                "first": "Primeiro",
                "last": "Último",
                "next": "Próximo",
                "previous": "Anterior"
            }
        }
    });

    $("th")[0].click();

}