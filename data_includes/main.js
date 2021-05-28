PennController.ResetPrefix(null) // Shorten command names (keep this line here)

Sequence("setcounter", "intro", "instruction", randomize('trial_prac'), 'warn', 'instruction2', randomize("experiment"), "feedback", SendResults(), "bye")

newTrial( "intro",

    newText("Welcome","Welcome! This is the second experiment you will participate in.<p>Please re-enter your Prolific ID below and click Next:")
        .settings.css("font-size", "2em")
        .print()
    ,
    
    newTextInput("ProlificID")
        .before(newText("ID", "Your Prolific ID:")
                .settings.css("font-size", "2em")
        )
        .settings.css("font-size", "2em")
        .settings.css('width', '50%')
        .settings.css('margin', 'auto')
        .print()
        .log()
    ,
    
    newButton("Next","Next")
        .center()
        .settings.css("font-size", "2em")
        .settings.css('margin', '40px')
        .settings.size(500, 48)
        .print()
        .wait()
)

newTrial("instruction",
    newText("Instr", "In this experiment, you will be rating how well some sentences describe some pictures. You will see a picture, with a sentence and a rating scale below it. Your task is to rate on a scale of 1 to 7 how well the sentence describes the picture shown. A rating of 1 means that the sentence is a very poor description of the picture, while a rating of 7 means that the sentence is a very good description of the picture. We are interested in your initial impression of how well the sentence describes the picture, so you shouldn't need to think things over for too long.</p>")
        .settings.css("font-size", "2em")
        .print()
    ,

    newButton("Click","Click here to begin practice trials!")
        .center()
        .settings.css("font-size", "2em")
        .settings.css("margin", "40px")
        .settings.size(500, 48)
        .print()
        .wait()
)

Template("prac.csv",
    row => newTrial("trial_prac",
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
)

newTrial( "warn",
    newText("Practice done!<p><b>Please note: some participants have reported that the script froze in the middle of the experiment. If this happens to you, please don’t panic, and let us know via the message function in Prolific. We will make sure that you will be compensated for the time you spent for the experiments.</b></p>")
        .settings.css("font-size", "2em")
        .print()
    ,
    newButton("Next", "Next")
        .center()
        .settings.css("font-size", "2em")
        .settings.css('margin', '40px')
        .settings.size(500, 48)
        .print()
        .wait()
)

newTrial("instruction2",
    newText("Instr2", "Now, you are ready to start the experiment! Remember, your task is to rate how well the sentence describes the picture. We are interested in your initial gut feeling, so there's no need to overthink things!")
        .settings.css("font-size", "2em")
        .print()
    ,

    newButton("Click","Click here to begin the experiment")
        .center()
        .settings.css("font-size", "2em")
        .settings.css('margin', '40px')
        .settings.size(550, 48)
        .print()
        .wait()
)

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

PennController("feedback",
    newText("feedback_instruction","If you have any feedback on the experiment, please leave it here.<p>")
        .center()
        .print()
    ,

    newTextInput("feedback", "")
        .center()
        .log()
        .lines(0)
        .size(420, 200)
        .print()
    ,

    newButton("send", "Send")
        .center()
        .settings.size(500,48)
        .settings.css("font-size", "2em")
        .settings.css('margin', '40px')
        .print()
        .wait()
)

newTrial("bye" ,
    newText("Thank you for your participation! Please go to the following web page to verify your participation: <a href='https://app.prolific.co/submissions/complete?cc=728AA2CF'>https://app.prolific.co/submissions/complete?cc=728AA2CF</a>.")
        .print(),
        
    newButton()
        .wait()  // Wait for a click on a non-displayed button = wait here forever
)
.setOption("countsForProgressBar" , false)
// Make sure the progress bar is full upon reaching this last (non-)trial