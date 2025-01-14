export default function ProductProperties({ properties, setProperties }: any) {
  // Add a new property with an empty options array
  const addProperty = () =>
    setProperties([...properties, { title: "", options: [] }]);

  // Update a property's title
  const updatePropertyTitle = (index: number, title: string) => {
    const updatedProperties = [...properties];
    updatedProperties[index].title = title;
    setProperties(updatedProperties);
  };

  // Add a new option to a property's options array
  const addPropertyOption = (index: number) => {
    const updatedProperties = [...properties];
    updatedProperties[index].options.push("");
    setProperties(updatedProperties);
  };
  // Remove a property
  const removeProperty = (index: number) =>
    setProperties(properties.filter((_: any, i: number) => i !== index));

  // Update an option's value
  const updatePropertyOption = (
    propertyIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedProperties = [...properties];
    updatedProperties[propertyIndex].options[optionIndex] = value;
    setProperties(updatedProperties);
  };
  // Remove an option from a property's options array
  const removePropertyOption = (propertyIndex: number, optionIndex: number) => {
    const updatedProperties = [...properties];
    updatedProperties[propertyIndex].options.splice(optionIndex, 1);
    setProperties(updatedProperties);
  };

  return (
    <section className="w-full gap-4 flex flex-col">
      <div className="gap-2 flex flex-col">
        <label>Properties</label>
        {properties.map((property: any, index: any) => (
          <div key={index} className="gap-2 flex flex-col ">
            <input
              type="text"
              placeholder="Property Title"
              value={property.title}
              onChange={(e) => updatePropertyTitle(index, e.target.value)}
            />
            {property.options.map((option: any, optionIndex: any) => (
              <div key={optionIndex} className="w-full gap-4 flex">
                <input
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) =>
                    updatePropertyOption(index, optionIndex, e.target.value)
                  }
                />
                <button
                  type="button"
                  className="button_destructive"
                  onClick={() => removePropertyOption(index, optionIndex)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="button_outline"
              onClick={() => addPropertyOption(index)}
            >
              Add Option
            </button>
            <button
              type="button"
              className="button_destructive"
              onClick={() => removeProperty(index)}
            >
              Remove Property
            </button>
          </div>
        ))}
        <button type="button" className="button_primary" onClick={addProperty}>
          Add Property
        </button>
      </div>
    </section>
  );
}
