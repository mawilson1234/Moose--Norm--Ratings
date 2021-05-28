PennController.ResetPrefix(null) // Shorten command names (keep this line here)

Sequence(randomize("experiment"), "send", "final")

Template("ArgAdjNorm.csv",
    row => newTrial("experiment",
        newImage(row.ImageURL)
            .size(500,500)
            .print()
        ,
        newText("How well does this sentence describe the picture shown?")
            .center()
            .print()
        ,
        newText(" ")
            .center()
            .print()
        ,
        newText(row.Sentence)
            .center()
            .print()
        ,
        newText(" ")
            .center()
            .print()
        ,
        newScale("rating", 7)
            .center()
            .css("margin", "0 10px 0 10px")
            .labelsPosition("bottom")
            .before(newText("Very poorly"))
            .after(newText("Very well"))
            .print()
            .log("last")
        ,
        newText(" ")
            .center()
            .print()
        ,
        newButton("next", "Next")
            .center()
            .disable()
            .print()
        ,
        getScale("rating")
            .wait()
        ,
        getButton("next")
            .enable()
            .wait()
    )
    .log( "Group" , row.Group )
    .log( "Item", row.Item )
    .log( "Type", row.Type )
    .log( "Condition", row.Condition )
    .log( "Verb", row.Verb )
    .log( "ImageIdent", row.ImageIdent )
    .log( "Sentence", row.Sentence )
    .log( "Name", row.Name )
    .log( "ImageURL", row.ImageURL )
)