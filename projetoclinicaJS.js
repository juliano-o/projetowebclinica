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
    
    const opcoesDependentes = {
        'Clinico Geral': [
            { valor: 'CH', texto: 'Dr. Carlos Henrique' },
            { valor: 'ML', texto: 'Dra. Marina Lopes' },
            { valor: 'SemPref', texto: 'Sem Preferencia'}
        ],
        'Fisioterapia': [
            { valor: 'FR', texto: 'Dr. Felipe Ramos' },
            { valor: 'CN', texto: 'Dra. Camila Nogueira' },
            { valor: 'SemPref', texto: 'Sem Preferencia'}
        ],
        'Nutricionista': [
            { valor: 'PM', texto: 'Dra. Paula Mendes' },
            { valor: 'RT', texto: 'Dr. Rafael Tavares' },
            { valor: 'SemPref', texto: 'Sem Preferencia'}
        ],
        'Exames Laboratoriais': [
            { valor: 'Hemo', texto: 'Hemograma completo' },
            { valor: 'Gli', texto: 'Glicemia em jejum' },
            { valor: 'Col', texto: 'Colesterol total e frações'},
            { valor: 'Tri', texto: 'Triglicerídeos' },
            { valor: 'Uri', texto: 'Exame de urina' },
            { valor: 'Fez', texto: 'Exame de fezes'}
        ],
        'Vacinas': [
            { valor: 'Gri', texto: 'Gripe (Influenza)' },
            { valor: 'Hep', texto: 'Hepatite A e B' },
            { valor: 'Tet', texto: 'Tétano e Difteria (dT)'},
            { valor: 'HPV', texto: 'HPV' },
            { valor: 'TriV', texto: 'Tríplice Viral (Sarampo, Caxumba e Rubéola)' },
            { valor: 'FebA', texto: 'Febre Amarela'},
            { valor: 'Men', texto: 'Meningocócica ACWY' },
            { valor: 'COV', texto: 'COVID-19'}            
        ],
        'Psicologia': [
            { valor: 'LC', texto: 'Dra. Larissa Cunha' },
            { valor: 'TM', texto: 'Dr. Thiago Moreira' },
            { valor: 'SemPref', texto: 'Sem Preferencia'}
        ],      
        'Pediatria': [
            { valor: 'BS', texto: 'Dra. Beatriz Souza' },
            { valor: 'RL', texto: 'Dr. Ricardo Lima' },
            { valor: 'SemPref', texto: 'Sem Preferencia'}
        ],   
        'Cardiologia': [
            { valor: 'AN', texto: 'Dr. André Nascimento' },
            { valor: 'FM', texto: 'Dra. Flávia Monteiro' },
            { valor: 'SemPref', texto: 'Sem Preferencia'}
        ],        
        'Dermatologia': [
            { valor: 'HP', texto: 'Dra. Helena Prado' },
            { valor: 'LF', texto: 'Dr. Lucas Fernandes' },
            { valor: 'SemPref', texto: 'Sem Preferencia'}
        ],
        'Odontologia': [
            { valor: 'PM', texto: 'Dra. Patrícia Martins' },
            { valor: 'HD', texto: 'Dr. Henrique Duarte' },
            { valor: 'SemPref', texto: 'Sem Preferencia'}
        ],        
        'Fonoaudiologia': [
            { valor: 'JR', texto: 'Dra. Joana Ribeiro' },
            { valor: 'PA', texto: 'Dr. Pedro Azevedo' },
            { valor: 'SemPref', texto: 'Sem Preferencia'}
        ]
    };

    // 2. LÓGICA PRINCIPAL
    $('#Especialidade').on('change', function() {
        // Elementos que serão manipulados
        const valorSelecionado = $(this).val(); 
        const $divContainer = $('#EspecialidadePt2'); 
        const $selectSecundario = $('#Especialidade2'); 

        // 3. Verifica se há opções disponíveis para o valor escolhido
        const opcoesParaAdicionar = opcoesDependentes[valorSelecionado];

        if (opcoesParaAdicionar && opcoesParaAdicionar.length > 0) {
            // A) SE HOUVEREM OPÇÕES: Mostra a DIV e Popula o SELECT
            
            // 1. Limpa e adiciona o placeholder
            $selectSecundario.empty(); 
            $selectSecundario.append('<option value="" selected disabled>Selecione</option>');
            
            // 2. Popula o select secundário com os dados
            $.each(opcoesParaAdicionar, function(i, item) {
                $selectSecundario.append(
                    $('<option>', {
                        value: item.valor,
                        text: item.texto
                    })
                );
            });
            
            // 3. Habilita o select, torna obrigatório e exibe a DIV com animação
            $selectSecundario.prop('disabled', false).prop('required', true);
            $divContainer.slideDown(200);

        } else {
            // B) SE NÃO HOUVEREM OPÇÕES OU A SELEÇÃO FOR INVÁLIDA (value="")
            
            // 1. Esconde a DIV com animação
            $divContainer.slideUp(200, function() {
                // 2. Limpa e desabilita o select após a animação terminar
                $selectSecundario
                    .empty()
                    .append('<option value="" selected disabled>-- Escolha a Categoria primeiro --</option>')
                    .prop('disabled', true)
                    .prop('required', false);
            });
        }
    });

    // Dispara o evento 'change' ao carregar, para garantir que o segundo select esteja escondido
    $('#Especialidade').trigger('change');

    $('form').on('submit', function(event) {
    const dataInput = $('#DataConsulta').val();
    const dataConsulta = new Date(dataInput);

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); 

    if (dataConsulta < hoje) {
        event.preventDefault();
        alert('A data da consulta não pode ser anterior à data atual.');
    }
});



