import React, { useState } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import Input from '../common/Input'
import Alert from '../common/Alert'
import Loader from '../common/Loader'

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GoalFormData {
  name: string;
  proofMethod: string;
  deadline: number;
  stakeAmount: number;
  paymentToken: 'SOL' | 'USDC';
  isPublic: boolean;
  isMultiplayer: boolean;
  maxParticipants: number;
  arbiterType: 'llm' | 'designated' | 'self';
  mediaFile: File | null;
  inviteEmails: string[];
}

const CreateGoalModal: React.FC<CreateGoalModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [goalData, setGoalData] = useState<GoalFormData>({
    name: '',
    proofMethod: '',
    deadline: 30,
    stakeAmount: 100,
    paymentToken: 'USDC',
    isPublic: true,
    isMultiplayer: false,
    maxParticipants: 5,
    arbiterType: 'llm',
    mediaFile: null,
    inviteEmails: [],
  })

  const [inviteEmail, setInviteEmail] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = 'checked' in e.target ? e.target.checked : undefined

    setGoalData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGoalData(prev => ({ ...prev, mediaFile: e.target.files![0] }))
    }
  }

  const addInviteEmail = () => {
    if (inviteEmail.trim() && !goalData.inviteEmails.includes(inviteEmail.trim())) {
      setGoalData(prev => ({
        ...prev,
        inviteEmails: [...prev.inviteEmails, inviteEmail.trim()]
      }))
      setInviteEmail('')
    }
  }

  const removeInviteEmail = (email: string) => {
    setGoalData(prev => ({
      ...prev,
      inviteEmails: prev.inviteEmails.filter(e => e !== email)
    }))
  }

  const validateStep = (stepNumber: number) => {
    if (stepNumber === 1) {
      if (!goalData.name.trim()) {
        setError('Please enter a goal name')
        return false
      }
      if (!goalData.proofMethod.trim()) {
        setError('Please describe your method of proof')
        return false
      }
      if (goalData.deadline < 1) {
        setError('Deadline must be at least 1 day')
        return false
      }
      if (goalData.stakeAmount < 1) {
        setError('Stake amount must be at least 1')
        return false
      }
      return true
    }

    if (stepNumber === 2) {
      if (goalData.isMultiplayer && goalData.maxParticipants < 2) {
        setError('Multiplayer goals must allow at least 2 participants')
        return false
      }
      return true
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      if (validateStep(1)) {
        setError('')
        setStep(2)
      }
      return
    }

    if (step === 2) {
      if (validateStep(2)) {
        setError('')
        setStep(3)
      }
      return
    }

    if (step === 3) {
      setLoading(true)
      try {
        // Mock API call to create goal
        console.log('Creating goal:', goalData)
        await new Promise(resolve => setTimeout(resolve, 2000))
        setStep(4)
      } catch (err) {
        console.error(err)
        setError('An error occurred while creating the goal. Please try again.')
      } finally {
        setLoading(false)
      }
      return
    }

    if (step === 4) {
      onClose()
      setStep(1)
      setGoalData({
        name: '',
        proofMethod: '',
        deadline: 30,
        stakeAmount: 100,
        paymentToken: 'USDC',
        isPublic: true,
        isMultiplayer: false,
        maxParticipants: 5,
        arbiterType: 'llm',
        mediaFile: null,
        inviteEmails: [],
      })
    }
  }

  const modalTitles = {
    1: 'Create New Goal - Basic Info',
    2: 'Goal Settings',
    3: 'Review & Payment',
    4: 'Goal Created!',
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitles[step]} size="large">
      {loading ? (
        <Loader text="Creating your goal..." />
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <Alert type="error" message={error} onClose={() => setError('')} className="mb-6" />}

          {/* Step 1: Basic Goal Info */}
          {step === 1 && (
            <div className="space-y-6">
              <Input
                label="Goal Name"
                name="name"
                value={goalData.name}
                onChange={handleChange}
                placeholder="e.g., Run a marathon"
                required
              />

              <div className="w-full">
                <label htmlFor="proofMethod" className="block font-bold text-base mb-2">
                  Method of Proof <span className="text-accent ml-1">*</span>
                </label>
                <textarea
                  id="proofMethod"
                  name="proofMethod"
                  value={goalData.proofMethod}
                  onChange={handleChange}
                  placeholder='e.g., "Will upload Strava link + photo of race bib and finish‑line time"'
                  rows={4}
                  maxLength={200}
                  required
                  className="input h-24 resize-y"
                />
                <p className="text-sm mt-1 text-gray-600">
                  Explain how you'll verify completion (100‑200 characters recommended).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Deadline (days)"
                  name="deadline"
                  type="number"
                  value={goalData.deadline}
                  onChange={handleChange}
                  min="1"
                  max="365"
                  required
                />

                <Input
                  label={`Stake Amount (${goalData.paymentToken})`}
                  name="stakeAmount"
                  type="number"
                  value={goalData.stakeAmount}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="w-full">
                <label htmlFor="paymentToken" className="block font-bold text-base mb-2">
                  Payment Token
                </label>
                <select
                  id="paymentToken"
                  name="paymentToken"
                  value={goalData.paymentToken}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="USDC">USDC</option>
                  <option value="SOL">SOL</option>
                </select>
              </div>

              <div className="w-full">
                <label htmlFor="mediaFile" className="block font-bold text-base mb-2">
                  Optional Media (Image/Video)
                </label>
                <div className="border-3 border-base p-4 bg-white">
                  <input
                    type="file"
                    id="mediaFile"
                    name="mediaFile"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="w-full"
                  />
                  {goalData.mediaFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected: {goalData.mediaFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Goal Settings */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={goalData.isPublic}
                    onChange={handleChange}
                    className="mr-2 h-5 w-5"
                  />
                  <span className="font-bold">Make this goal public</span>
                </label>
                <p className="text-sm text-gray-600 ml-7">
                  Public goals are visible to everyone and can inspire others.
                </p>
              </div>

              <div>
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="isMultiplayer"
                    checked={goalData.isMultiplayer}
                    onChange={handleChange}
                    className="mr-2 h-5 w-5"
                  />
                  <span className="font-bold">Multiplayer Goal</span>
                </label>
                <p className="text-sm text-gray-600 ml-7">
                  Allow others to join this goal with their own stakes.
                </p>
              </div>

              {goalData.isMultiplayer && (
                <div className="ml-7 space-y-4">
                  <Input
                    label="Maximum Participants"
                    name="maxParticipants"
                    type="number"
                    value={goalData.maxParticipants}
                    onChange={handleChange}
                    min="2"
                    max="20"
                  />

                  <div>
                    <label htmlFor="arbiterType" className="block font-bold text-base mb-2">
                      Arbiter Type
                    </label>
                    <select
                      id="arbiterType"
                      name="arbiterType"
                      value={goalData.arbiterType}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="llm">AI Judge (LLM)</option>
                      <option value="designated">Designated Arbiter Pool</option>
                      <option value="self">Self-Verification</option>
                    </select>
                    <p className="text-sm text-gray-600 mt-1">
                      Choose who will verify goal completion for all participants.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="inviteEmail" className="block font-bold text-base mb-2">
                      Invite Participants (Optional)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        id="inviteEmail"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="input flex-1"
                      />
                      <Button type="button" variant="secondary" onClick={addInviteEmail}>
                        Add
                      </Button>
                    </div>
                    
                    {goalData.inviteEmails.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm font-bold">Invited participants:</p>
                        {goalData.inviteEmails.map(email => (
                          <div key={email} className="flex justify-between items-center bg-gray-100 border-2 border-base p-2">
                            <span className="text-sm">{email}</span>
                            <button
                              type="button"
                              onClick={() => removeInviteEmail(email)}
                              className="text-accent hover:text-red-700"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review & Payment */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="neo-container">
                <h3 className="font-bold text-xl mb-4">Goal Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Goal:</span>
                      <span className="font-bold">{goalData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Deadline:</span>
                      <span className="font-bold">{goalData.deadline} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stake:</span>
                      <span className="font-bold">{goalData.stakeAmount} {goalData.paymentToken}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Visibility:</span>
                      <span className="font-bold">{goalData.isPublic ? 'Public' : 'Private'}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-bold">{goalData.isMultiplayer ? 'Multiplayer' : 'Solo'}</span>
                    </div>
                    {goalData.isMultiplayer && (
                      <>
                        <div className="flex justify-between">
                          <span>Max Participants:</span>
                          <span className="font-bold">{goalData.maxParticipants}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Arbiter:</span>
                          <span className="font-bold">{goalData.arbiterType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Invited:</span>
                          <span className="font-bold">{goalData.inviteEmails.length} people</span>
                        </div>
                      </>
                    )}
                    {goalData.mediaFile && (
                      <div className="flex justify-between">
                        <span>Media:</span>
                        <span className="font-bold">Attached</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white border-3 border-base p-6">
                <h3 className="font-bold text-xl mb-4">Payment Instructions</h3>
                <p className="mb-4">
                  After confirming, the required {goalData.paymentToken} will be transferred automatically. 
                  No manual transfer is needed.
                </p>
                {goalData.isMultiplayer && (
                  <p className="text-sm text-gray-600">
                    Note: Invited participants will need to stake the same amount ({goalData.stakeAmount} {goalData.paymentToken}) 
                    to join this goal.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-6 border-3 border-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-black text-2xl mb-4">Goal Created Successfully!</h3>
              <p className="mb-6">
                Your goal has been created and your stake has been locked.
                {goalData.isMultiplayer && goalData.inviteEmails.length > 0 && 
                  ` Invitations have been sent to ${goalData.inviteEmails.length} people.`}
                <br />
                Now it's time to get to work!
              </p>
              {goalData.isMultiplayer && (
                <p className="text-sm text-gray-600 mb-6">
                  Your goal is now open for others to join. Share the goal link to invite more participants!
                </p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <div className="flex-1">
              {step > 1 && step < 4 && (
                <Button type="button" variant="secondary" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              {step === 1 && (
                <Button type="button" variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
              )}
            </div>
            
            <div className="flex-1 flex justify-end">
              {step < 3 && (
                <Button type="submit" variant="primary" animate={true}>
                  {step === 1 ? 'Next: Settings' : 'Next: Review'}
                </Button>
              )}

              {step === 3 && (
                <Button type="submit" variant="primary">
                  Confirm & Create Goal
                </Button>
              )}

              {step === 4 && (
                <Button type="submit" variant="primary" animate={true} className="w-full">
                  View Your Goal
                </Button>
              )}
            </div>
          </div>
        </form>
      )}
    </Modal>
  )
}

export default CreateGoalModal