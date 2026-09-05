/* Test only... not for production !!!! */
/**
 *
 * License: GNU GPL v2
 *
 */
class Rdyblock {

    #blockName;
    constructor(blockName)
    {
        this.#blockName = blockName;
    }

    buildBlock()
    {
        switch (this.#blockName)
        {

            case "contact-us":

                let submit_url = arguments[0] || "/contact-us";
                
                return (new Html("form"))
                    .attrs({ method: "POST", action: submit_url })
                    .child(

                        (new Html("div")).child(
                            (new Html("label")).text("Your name").child(
                                (new Html("input")).attrs("required", {
                                    type: "text",
                                    name: "personName",
                                }),
                            )
                        ),

                        (new Html("div")).child(
                            (new Html("label")).text("Your email address").child(
                                (new Html("input")).attrs("required", {
                                    type: "email",
                                    name: "personEmail",
                                }),
                            )
                        ),

                        (new Html("div")).child(
                            (new Html("label")).text("Your phone number").child(
                                (new Html("input")).attrs({
                                    type: "tel",
                                    name: "personTelephone",
                                }),
                            )
                        ),

                        (new Html("div")).child(
                            (new Html("label")).text("The subject?").child(
                                (new Html("input")).attrs("required", {
                                    type: "text",
                                    name: "messageSubject",
                                }),
                            )
                        ),

                        (new Html("div")).child(
                            (new Html("label")).text("Your message").child(
                                (new Html("textarea")).attrs("required", {
                                    name: "messageText",
                                }),
                            )
                        ),

                        (new Html("button")).attrs({ type: "submit" }).text("Send")

                    )
                    .return();

                break;
            case "search":
                let search_url = arguments[0] || "/";
                let search_url_parameter = arguments[1] || "q";
                let search_text_label = arguments[2] || "What's on your mind?";
                let search_button_text = arguments[3] || "Search!";

                const datalist_id = "_a" + (new Date).getMilliseconds();

                return (new Html("search")).child(
                    (new Html("form")).attrs({
                        method: "GET",
                        action: search_url
                    }).child(
                        (new Html("label")).text(search_text_label).child(
                            (new Html("input")).attrs({
                                type: "search",
                                list: datalist_id,
                                name: search_url_parameter
                            })
                        ),
                        (new Html("datalist")).child(
                            
                            (new Html("option")).attrs({ 
                                value: "a"
                            }),

                            (new Html("option")).attrs({ 
                                value: "ab"
                            }),

                            (new Html("option")).attrs({ 
                                value: "abc"
                            }),

                            (new Html("option")).attrs({ 
                                value: "abcd"
                            })

                        ).attrs({ id: datalist_id }),
                        (new Html("button")).text(search_button_text).attrs({
                            type: "submit"
                        })
                    )
                ).return();
                break;

        }
    }

}
