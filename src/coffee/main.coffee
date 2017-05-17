timeleft = 30
$ ->
    downloadTimer = () ->
        setInterval ->
            $('#time-counter').value = 30 - --timeleft
            clearInterval downloadTimer if timeleft < 0
        , 1000

  	$('td').on 'click', ->
        $(this).addClass "queen-images"

	$('#rollback-button').on 'click', ->
        $(this).hide()

    $('#restart-button').on 'click', ->
        $('td').removeClass "queen-images"
        $('#rollback-button').show()
        $('#time-counter').html 0
        timeleft = 30