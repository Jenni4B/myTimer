import FocusVideos from "./focusVideos";

const FocusHelpPage = () => {

    return(
        <div>
            <p>On this page, you can add background noise like white noise or lofi music, 
                so you don&apos;t have to search for it on Youtube!
            </p>

            <div className="focus-help-container">
                <div>
                    <FocusVideos />
                </div>
            </div>
        </div>
    )
};

export default FocusHelpPage;