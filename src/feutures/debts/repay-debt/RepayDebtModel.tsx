import { useStore } from 'effector-react';
import { Button, Dialog, Input } from 'shared/ui';
import { repayModalModel } from './model';
import { Form, Formik } from 'formik';
import { number, object } from 'yup';

const getRepaySchema = (amount: number) =>
  object().shape({
    amount: number().min(0).max(amount),
  });

export const RepayDebtModel = () => {
  const { isOpen, amount } = useStore(repayModalModel.$modal);
  const repaySchema = getRepaySchema(amount ?? 0);

  const handleSubmit = (value: { amount: number }) => {
    repayModalModel.submit(+value.amount);
  };

  return (
    <Dialog.Root isOpen={isOpen} onClose={repayModalModel.closeModal}>
      <Dialog.Content>
        <Dialog.Title>Вернуть долг</Dialog.Title>
        <Formik initialValues={{ amount: amount! }} onSubmit={handleSubmit} validationSchema={repaySchema}>
          <Form>
            <Input label="Сумма" placeholder="Введите сумма" name="amount" />
            <Dialog.Footer>
              <Button variant="text" onClick={() => repayModalModel.closeModal()}>
                Закрыть
              </Button>
              <Button variant="contained" type="submit">
                Вернуть долг
              </Button>
            </Dialog.Footer>
          </Form>
        </Formik>
      </Dialog.Content>
    </Dialog.Root>
  );
};
