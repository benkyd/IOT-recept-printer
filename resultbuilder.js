module.exports.genCompilerSettings = function(obj) {
    if (!obj || !obj.padding || !obj.lineBreaks || !obj.lines) {
        return -1;
    }
    let arguments = [];

    arguments.push(obj.padding);
    arguments.push(obj.lineBreaks);
    let alignments = ['L', 'C', 'R'];
    let sizes = ['S', 'M', 'L'];

    obj.lines.forEach((line) => {
        let align = line.align.toUpperCase().split('')[0];
        let size = line.size.toUpperCase().split('')[0];;

        arguments.push(align);
        arguments.push(size);
        arguments.push(line.content);
    });
    
    return {
        mode: 'text',
        pythonOptions: ['-u'],
        args: arguments
    }
}

// if (align != 'L' || align != 'C' || align != 'R') return -1;
// if (size != 'S' || size != 'M' || size != 'L') return -1;
