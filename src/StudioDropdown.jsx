export function StudioDropdown({ studios, selectedStudio, onStudioChange }) {
    return (
        <div className="field is-horizontal" role="group" aria-labelledby="studioDropdownLabel">
            <div className="field-label is-normal">
                <label id="studioDropdownLabel" className="label" htmlFor="studios">
                    Studio
                </label>
            </div>
            <div className="field-body">
                <div className="field">
                    <div className="control" style={{ minWidth: "200px" }}>
                        <div className="select" style={{ width: "150px" }}>
                            <select 
                                id="studios" 
                                value={selectedStudio}
                                onChange={(e) => onStudioChange(e.target.value)}
                                aria-required="true"
                                aria-describedby="studioDropdownHelp"
                            >
                                <option value=""></option>
                                {studios.map((studio) => (
                                    <option key={studio} value={studio}>
                                        {studio}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
