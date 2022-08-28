import { FieldArray, Form, Formik } from 'formik';
import { array, number, object, string } from 'yup';
import { useStore } from 'effector-react';
import { Button, Dialog, Input } from '../../../shared/ui';
import { UserSelect } from '../../users';
import { addDebtModel } from './model';
import { FormValue } from './types';

const validationSchema = object().shape({
  description: string().required(),
  debts: array().of(
    object().shape({
      userId: number().required().positive(),
      amount: number().required().positive().integer(),
    })
  ),
});

const initialValue: FormValue = {
  description: '',
  debts: [
    {
      userId: 0,
      amount: 0,
    },
  ],
};

export const AddDebtsModal = () => {
  const isOpen = useStore(addDebtModel.$isOpen);

  const dispatchAddTransaction = async (data: FormValue) => {
    try {
      await addDebtModel.addDebtsFx(data);
      addDebtModel.closeModal();
    } catch (e) {
      // todo: show notification
    }
  };

  return (
    <Dialog.Root isOpen={isOpen} onClose={addDebtModel.closeModal}>
      <Dialog.Content>
        <Dialog.Title>Добавить долг!</Dialog.Title>

        <Formik initialValues={initialValue} onSubmit={dispatchAddTransaction} validationSchema={validationSchema}>
          {({ values, submitCount, isValid }) => (
            <Form className="flex flex-col space-y-2 mt-4">
              <Input name="description" label="Описание" type="text" placeholder="Такси..." />

              <FieldArray name="debts">
                {(arrayHelpers) => (
                  <>
                    <Button size="small" className="mb-2" onClick={() => arrayHelpers.push({ userId: 0, amount: 0 })}>
                      Добавить должника
                    </Button>

                    <div className="overflow-y-auto max-h-96 space-y-2">
                      {values.debts.map((debt, index) => (
                        <div key={index}>
                          <div className="space-y-2">
                            <UserSelect fieldName={`debts.${index}.userId`} />
                            <Input name={`debts.${index}.amount`} type="number" min="0" label="Сумма" />
                          </div>
                          {(index !== 0 || values.debts.length > 1) && (
                            <div>
                              <Button
                                size="small"
                                color="secondary"
                                className="block ml-auto mt-1.5"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                Удалить
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </FieldArray>

              <Dialog.Footer>
                <Button onClick={() => addDebtModel.closeModal()}>Закрыть</Button>
                <Button disabled={submitCount > 0 && !isValid} variant="contained" type="submit">
                  Добавить
                </Button>
              </Dialog.Footer>
            </Form>
          )}
        </Formik>
      </Dialog.Content>
    </Dialog.Root>
  );
};
