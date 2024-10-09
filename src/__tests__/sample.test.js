import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Form } from '../components/form';

describe('When collapsibleConfig is absent in a field config', () => {
  test('Checkbox and collapse field label should not appear', () => {
    render(
      <Form
        onSave={() => {}}
        profile={{}}
        formConfig={[
          {
            id: 'firstName',
            type: 'TEXT',
            label: 'First Name',
            placeholder: 'Enter first name',
          },
        ]}
      />
    );

    screen.getByLabelText('First Name');
    expect(
      screen.queryByTestId('collapsible-input-firstName')
    ).not.toBeInTheDocument();
  });
});

describe('Verify Initial Checkbox State and Collapsible Input Display', () => {
  test('Checkbox should be checked by default and collapsible input should display value present in profile for that field', () => {
    render(
      <Form
        onSave={() => {}}
        profile={{
          age: 30,
        }}
        formConfig={[
          {
            id: 'age',
            type: 'NUMBER',
            label: 'Age',
            collapsibleConfig: {
              title: 'Allow Age Selection',
              initialValue: 45,
            },
          },
        ]}
      />
    );

    screen.getByLabelText('Age');
    expect(screen.getByLabelText('Age')).toHaveValue(30);
    screen.getByLabelText('Allow Age Selection');

    expect(screen.getByTestId('collapsible-input-age').checked).toBe(true);
  });

  test('Checkbox should be unchecked by default and collapsible input should not display the field', () => {
    render(
      <Form
        onSave={() => {}}
        profile={{ firstName: 'John', lastName: 'Doe' }}
        formConfig={[
          {
            id: 'age',
            type: 'NUMBER',
            label: 'Age',
            collapsibleConfig: {
              title: 'Allow Age Selection',
              initialValue: 45,
            },
          },
        ]}
      />
    );

    expect(screen.queryByLabelText('Age')).not.toBeInTheDocument();

    screen.getByLabelText('Allow Age Selection');

    expect(screen.getByTestId('collapsible-input-age').checked).toBe(false);
  });
});

describe('Verify Checkbox Behaviour in Collapsible Input', () => {
  test('When user toggles it on, it should show the field', async () => {
    render(
      <Form
        onSave={() => {}}
        profile={{ firstName: 'John', lastName: 'Doe' }}
        formConfig={[
          {
            id: 'age',
            type: 'NUMBER',
            label: 'Age',
            collapsibleConfig: {
              title: 'Allow Age Selection',
              initialValue: 45,
            },
          },
        ]}
      />
    );

    expect(screen.queryByLabelText('Age')).not.toBeInTheDocument();

    screen.getByLabelText('Allow Age Selection');

    expect(screen.getByTestId('collapsible-input-age').checked).toBe(false);

    await user.click(screen.getByLabelText('Allow Age Selection'));

    expect(screen.getByTestId('collapsible-input-age').checked).toBe(true);

    screen.getByLabelText('Age');
  });

  test('When user toggles it off, it should hide the field', async () => {
    render(
      <Form
        onSave={() => {}}
        profile={{ firstName: 'John', lastName: 'Doe', age: 15 }}
        formConfig={[
          {
            id: 'age',
            type: 'NUMBER',
            label: 'Age',
            collapsibleConfig: {
              title: 'Allow Age Selection',
              initialValue: 45,
            },
          },
        ]}
      />
    );

    screen.getByLabelText('Age');
    expect(screen.getByLabelText('Age')).toHaveValue(15);
    screen.getByLabelText('Allow Age Selection');

    expect(screen.getByTestId('collapsible-input-age').checked).toBe(true);

    await user.click(screen.getByLabelText('Allow Age Selection'));

    expect(screen.getByTestId('collapsible-input-age').checked).toBe(false);

    expect(screen.queryByLabelText('Age')).not.toBeInTheDocument();
  });
});

describe('Verify Save Behaviour for Collapsible Input Field', () => {
  test('When user toggles collapsible field off, on submitting the form undefined value should be saved', async () => {
    const mockSave = jest.fn();
    render(
      <Form
        onSave={mockSave}
        profile={{
          age: 30,
          firstName: 'John',
        }}
        formConfig={[
          {
            id: 'firstName',
            type: 'TEXT',
            label: 'First Name',
            placeholder: 'Enter first name',
          },
          {
            id: 'lastName',
            type: 'TEXT',
            label: 'Last Name',
            placeholder: 'Enter last name',
            collapsibleConfig: {
              title: 'Allow Last Name',
            },
          },
          {
            id: 'age',
            type: 'NUMBER',
            label: 'Age',
            collapsibleConfig: {
              title: 'Allow Age Selection',
              initialValue: 45,
            },
          },
        ]}
      />
    );

    screen.getByLabelText('Age');
    expect(screen.getByLabelText('Age')).toHaveValue(30);

    user.click(screen.getByLabelText('Allow Age Selection'));

    expect(screen.getByTestId('collapsible-input-age').checked).toBe(false);

    await user.click(screen.getByText('Save'));

    expect(mockSave).toHaveBeenCalledWith({
      age: undefined,
      firstName: 'John',
    });
  });

  test('When user toggles on collapsible field having some initial value, on submitting the form initial value should be saved', async () => {
    const mockSave = jest.fn();
    render(
      <Form
        onSave={mockSave}
        profile={{
          lastName: 'Doe',
          firstName: 'John',
        }}
        formConfig={[
          {
            id: 'firstName',
            type: 'TEXT',
            label: 'First Name',
            placeholder: 'Enter first name',
          },
          {
            id: 'lastName',
            type: 'TEXT',
            label: 'Last Name',
            placeholder: 'Enter last name',
            collapsibleConfig: {
              title: 'Allow Last Name',
            },
          },
          {
            id: 'age',
            type: 'NUMBER',
            label: 'Age',
            collapsibleConfig: {
              title: 'Allow Age Selection',
              initialValue: 45,
            },
          },
        ]}
      />
    );

    expect(screen.queryByLabelText('Age')).not.toBeInTheDocument();

    await user.click(screen.getByLabelText('Allow Age Selection'));

    expect(screen.getByTestId('collapsible-input-age').checked).toBe(true);

    screen.getByLabelText('Age');

    expect(screen.getByLabelText('Age')).toHaveValue(45);

    await user.click(screen.getByText('Save'));

    expect(mockSave).toHaveBeenCalledWith({
      age: 45,
      firstName: 'John',
      lastName: 'Doe',
    });
  });

  test('When user toggles on collapsible field without some initial value, on submitting the form undefined should be saved', async () => {
    const mockSave = jest.fn();
    render(
      <Form
        onSave={mockSave}
        profile={{
          lastName: 'Doe',
          firstName: 'John',
        }}
        formConfig={[
          {
            id: 'firstName',
            type: 'TEXT',
            label: 'First Name',
            placeholder: 'Enter first name',
          },
          {
            id: 'lastName',
            type: 'TEXT',
            label: 'Last Name',
            placeholder: 'Enter last name',
            collapsibleConfig: {
              title: 'Allow Last Name',
            },
          },
          {
            id: 'age',
            type: 'NUMBER',
            label: 'Age',
            collapsibleConfig: {
              title: 'Allow Age Selection',
            },
          },
        ]}
      />
    );

    expect(screen.queryByLabelText('Age')).not.toBeInTheDocument();

    await user.click(screen.getByLabelText('Allow Age Selection'));

    expect(screen.getByTestId('collapsible-input-age').checked).toBe(true);

    screen.getByLabelText('Age');

    await user.click(screen.getByText('Save'));

    expect(mockSave).toHaveBeenCalledWith({
      age: undefined,
      firstName: 'John',
      lastName: 'Doe',
    });
  });

  test('Toggling collapsible field back on should display previously filled value and on submitting the form updated value should be saved', async () => {
    const mockSave = jest.fn();
    render(
      <Form
        onSave={mockSave}
        profile={{
          lastName: 'Deb',
          firstName: 'John',
        }}
        formConfig={[
          {
            id: 'firstName',
            type: 'TEXT',
            label: 'First Name',
            placeholder: 'Enter first name',
          },
          {
            id: 'lastName',
            type: 'TEXT',
            label: 'Last Name',
            placeholder: 'Enter last name',
            collapsibleConfig: {
              title: 'Allow Last Name',
              initialValue: 'Doe'
            },
          },
          {
            id: 'age',
            type: 'NUMBER',
            label: 'Age',
            collapsibleConfig: {
              title: 'Allow Age Selection',
              initialValue: 33,
            },
          },
        ]}
      />
    );

    const lastNameInput = screen.getByLabelText('Last Name');

    expect(lastNameInput).toHaveValue('Deb');

    await user.clear(lastNameInput);

    await user.type(lastNameInput, 'Touie');

    expect(lastNameInput).toHaveValue('Touie');

    await user.click(screen.getByLabelText('Allow Last Name'));
    await user.click(screen.getByLabelText('Allow Age Selection'));

    expect(screen.queryByLabelText('Last Name')).not.toBeInTheDocument();

    screen.getByLabelText('Age');
    expect(screen.getByLabelText('Age')).toHaveValue(33);

    await user.click(screen.getByLabelText('Allow Last Name'));

    expect(screen.getByLabelText('Last Name')).toHaveValue('Touie');

    await user.click(screen.getByText('Save'));

    expect(mockSave).toHaveBeenCalledWith({
      lastName: 'Touie',
      firstName: 'John',
      age: 33,
    });
  });
});
