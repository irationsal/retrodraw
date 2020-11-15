let PALETTE = [
    'orange',
    'red',
    'blue', 
    'green',
    'yellow',
    'purple',
    'pink',
    'black',
    'white',
]

let mouseIsDown = false

function makePalette() {    
    for (let x = 0; x < PALETTE.length; x++) {
        let currentColor = PALETTE[x]
        let button = $('<button>').css('background', currentColor)
        $('.palette').append(button)
    }

    $('.palette button').first().addClass('active');
}

function makeGrid(){
    for (let x = 0; x < 64; x++) {
        let div = $('<div>').attr('class', 'cell')
        $('.grid').append(div)
    }
}

function onPaletteClick() {
    $('.palette button').removeClass('active')
    $(this).addClass('active')
    mouseIsDown = false
}

function onGridClick() {
    let selectedBackgroundColor = $('.active').css('background-color')
    if ($(this).css('background-color') === selectedBackgroundColor)
        $(this).css("background-color", "")
    else
        $(this).css("background-color", selectedBackgroundColor)
}

function onClearClick() {
    $('.grid .cell').css('background-color', '')
    mouseIsDown = false
}

function onFillAllClick() {
    let selectedBackgroundColor = $('.active').css('background-color')
    $('.grid .cell').css('background-color', selectedBackgroundColor)
    mouseIsDown = false
}

function onFillEmptyClick() {
    let cells = $('.grid .cell')
    let selectedBackgroundColor = $('.active').css('background-color')
    for (let x = 0; x < cells.length; x++) {
        console.log(cells[x])
        console.log($(cells[x]).css('background-color'))
        if ($(cells[x]).css('background-color') === 'rgba(0, 0, 0, 0)') {
            $(cells[x]).css('background-color', selectedBackgroundColor)
        }
    }
    mouseIsDown = false
}

function appendColor() {
    let desiredColor = $('.controls input').val()
    for (let x = 0; x < PALETTE.length; x++) {
        let currentColor = PALETTE[x]
        if (desiredColor === currentColor) {        
            return $('.controls input').val('That color exits!')
        } else if (desiredColor === 'That color exits!') {
            return
        }

    }
    console.log(desiredColor)
    PALETTE.push(desiredColor)
    let button = $('<button>').css('background', desiredColor)
    $('.palette').append(button)
    $('.palette button').removeClass('active')
    $(button).addClass('active')
    mouseIsDown = false
}


//TODO: figure out ratios to fit into grid
function updateGrid() {
    let grid = $('.grid .cell')
    for (let x = 0; x < grid.length; x++) {
        grid.remove()
    }
    let height = $('#height').val()
    let width = $('#width').val()
    let size = height * width
    console.log(height)
    console.log(width)
    console.log(size)
    for (let x = 0; x < size; x++) {
        let div = $('<div>').attr('class', 'cell')
        div.css({
            'flex': '0 0 ' + size,
            'height': size
        })
        $('.grid').append(div)
        console.log("made div")
    }
    $('.grid').css({
        'width': size * width,
        'height': size * height
    })
    enableFill()
}

function enableFill() {
    $('.palette button').click(onPaletteClick)
    $('.grid .cell').click(onGridClick).mouseenter(function () {
    let mouseDown = $(this).mousedown(function () {
        mouseIsDown = true
    })
    let mouseUp = $(this).mouseup(function () {
        mouseIsDown = false
    })

    if (mouseIsDown) {
        let selectedBackgroundColor = $('.active').css('background-color')
        if ($(this).css('background-color') === selectedBackgroundColor)
            $(this).css("background-color", "")
        else
            $(this).css("background-color", selectedBackgroundColor)
    }

    console.log(mouseIsDown)
})
}



makePalette()
makeGrid()
$('.palette button').click(onPaletteClick)
$('.grid .cell').click(onGridClick).mouseenter(function () {
    let mouseDown = $(this).mousedown(function () {
        mouseIsDown = true
    })
    let mouseUp = $(this).mouseup(function () {
        mouseIsDown = false
    })

    if (mouseIsDown) {
        let selectedBackgroundColor = $('.active').css('background-color')
        if ($(this).css('background-color') === selectedBackgroundColor)
            $(this).css("background-color", "")
        else
            $(this).css("background-color", selectedBackgroundColor)
    }

    console.log(mouseIsDown)
})


$('.controls .clear').click(onClearClick)
$('.controls .fill-all').click(onFillAllClick)
$('.controls .fill-empty').click(onFillEmptyClick)
$('.controls .append-color').click(appendColor)
$('.grid-controls button').click(updateGrid)