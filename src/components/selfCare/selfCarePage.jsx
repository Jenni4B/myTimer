import SelfCareTasks from "./selfCareTasks/selfCTasks";

const SelfCarePage = () => {

    return(
        <div>
            <h3>Self-Care Page</h3>

            <div className="focus-help-container">
                <div>
                    <SelfCareTasks />
                </div>
            </div>
        </div>
    )
};

export default SelfCarePage;