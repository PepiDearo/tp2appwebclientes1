
export function StudioDropdown({ studios, selectedStudio, onStudioChange }) {
    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label" htmlFor="studios">Studio</label>
            </div>
            <div className="field-body">
                <div className="field">
                    <div className="control" style={{ minWidth: "200px" }}>
                        <div className="select" style={{ width: "150px" }}>
                            <select 
                                id="studios" 
                                value={selectedStudio}
                                onChange={(e) => onStudioChange(e.target.value)}
                            >
                                <option value=""></option>
                                {studios.map((studio) => (
                                    <option key={studio} value={studio.name}>
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