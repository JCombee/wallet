import bankAccountsQueueRepository from './../repositories/bankAccountsQueue'
import bankAccountsRepository from './../repositories/bankAccounts'
import Promise from 'es6-promise'

export default function () {
  return new Promise((resolve) => {
    bankAccountsQueueRepository.load().then(() => {
      bankAccountsRepository.load().then(() => {
        bankAccountsQueueRepository.all().then(bankAccounts => {
          function forEachBankAccount (bankAccounts, i = 0) {
            const bankAccount = bankAccounts[ i ]
            if (!bankAccount) {
              bankAccountsQueueRepository.store()
              bankAccountsRepository.store()
              return resolve()
            }

            bankAccountsRepository.updateOrCreate(bankAccount).then(() => {
              bankAccountsQueueRepository.remove({ _id: bankAccount._id }).then(() => forEachBankAccount(bankAccounts, i + 1))
            })
          }

          forEachBankAccount(bankAccounts)
        })
      })
    })
  })
}
