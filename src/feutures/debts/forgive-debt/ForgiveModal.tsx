import { Button, Dialog, Input } from '../../../shared/ui';
import { useStore } from 'effector-react';
import { Form, Formik } from 'formik';
import { forgiveModel } from './model';


const ForgiveModal = () => {
  const state = useStore(forgiveModel.$modal);
  const loading = useStore(forgiveModel.forgiveDebtFx.pending);

  const handleSubmit = (amount: number) => {
    forgiveModel.submit(amount)
  }

  return (
    <Dialog.Root isOpen={state.isOpen} onClose={forgiveModel.closeModal}>
      <Dialog.Content>
        <Dialog.Title>Простить долг!</Dialog.Title>

        <Formik initialValues={{ amount: state.amount }} onSubmit={(e) => handleSubmit(Number(e.amount))}>
          <Form>
            <div className="my-1">
              <Input label="Сумма долга" name="amount" placeholder="Сумма"/>
            </div>

            <Dialog.Footer>
              <Button disabled={loading} color="error" type="submit">Простить</Button>
            </Dialog.Footer>
          </Form>
        </Formik>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ForgiveModal }
