/**
 * FILL THE GAPS IN THE COMPONENT TO SUPPORT:
 * 1. Fields without collapsibleConfig prop should not show a checkbox and label
 * 2. Clicking on checkbox should show/hide the respective field
 * 3. initialValue supplied via collapsibleConfig should be used to prepopulate the field when collapsible input is expanded and no value present in profile for it
 * 4. If the user modifies value of a collapsible field and toggles it off. Then on expanding the field again, the modified value should appear in the field
 */

export const withCollapsibleInput = (Component) => (props) => {
  const { collapsibleConfig = {}, id, ...restProps } = props;
  const { title } = collapsibleConfig;

  // Implement checkbox toggle to control visibility of the field
  const handleToggle = (e) => {};

  return (
    <div className="flex flex-col rounded-md border border-solid border-slate-300 p-3">
      <div className="flex items-center gap-3">
        <input
          id={`collapsible-input-${id}`}
          name={`collapsible-input-${id}`}
          data-testid={`collapsible-input-${id}`}
          type="checkbox"
          onChange={handleToggle}
          value={false}
          checked={false}
        />
        <label
          htmlFor={`collapsible-input-${id}`}
          className="text-sm font-semibold leading-3.5 text-slate-700"
        >
          {title}
        </label>
      </div>

      <div className="mt-3">
        <Component {...restProps} id={id} />
      </div>
    </div>
  );
};
