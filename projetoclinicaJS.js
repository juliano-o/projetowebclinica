$(document).ready(function () {
    // Máscaras
    $('#CPF').mask('000.000.000-00');

    // Máscara Condicional para Telefone (celular e fixo)
    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    };
    spOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };
    $('#Telefone').mask(SPMaskBehavior, spOptions);
    
    $('#Convenio').change(function () {
        var valorSelecionado = $(this).val();
        var campoExtra = $('#CampoOutroConvenio');
        var inputExtra = $('#OutroConvenio');

        if (valorSelecionado === 'Outros') {
            campoExtra.slideDown(200);
            inputExtra.prop('disabled', false).prop('required', true);
        } else {
            campoExtra.slideUp(200);
            inputExtra.prop('disabled', true).prop('required', false).val('');
        }
    });
});

