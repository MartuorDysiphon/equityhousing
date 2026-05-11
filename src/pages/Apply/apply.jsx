import React from 'react';
import { useForm } from 'react-hook-form';
import './apply.css';

const Apply = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key !== 'documents') {
          formData.append(key, data[key]);
        }
      });
      
      // Handle file uploads
      if (data.documents && data.documents.length > 0) {
        for (let i = 0; i < data.documents.length; i++) {
          formData.append('documents', data.documents[i]);
        }
      }
      
      formData.append('_subject', `New Student Application from ${data.fullName}`);

      const response = await fetch('https://formspree.io/f/xeordaly', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert('Thank you! Your application has been submitted successfully. We will review it and contact you within 24 hours.');
        reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      alert('There was an error submitting your application. Please try again or contact us directly.');
    }
  };

  const universities = [
    'University of Free State',
    'Central University of Technology', 
    'Private Universities'
  ];

  const studyLevels = [
    '1st Year Undergraduate',
    '2nd Year Undergraduate',
    '3rd Year Undergraduate',
    '4th Year Undergraduate',
    'Honours',
    'Masters',
    'PhD',
    'Diploma',
    'Certificate'
  ];

  const courseTypes = [
    'Full-time',
    'Part-time',
    'Distance Learning'
  ];

  const accommodationBuildings = [
    { value: 'rosenhof', name: 'Rosenhof', description: 'Premium student residence with modern facilities' },
    { value: 'meldine', name: 'Meldine', description: 'Secure and comfortable living spaces' },
    { value: 'ashbrough-heights', name: 'Ashbrough Heights', description: 'Luxury accommodation with great views' },
    { value: 'vlu', name: 'VLU', description: 'Vibrant student community near campus' },
    { value: 'heather-court', name: 'Heather Court', description: 'Affordable and convenient location' },
    { value: 'automatic', name: 'Automatic Placement', description: 'Let us choose the best available option for you' }
  ];

  const selectedBuilding = watch('accommodationBuilding');

  return (
    <div className="apply-page">
      <div className="apply-container">
        <div className="apply-header">
          <h1>Student Accommodation Application</h1>
          <p>Complete your application for quality student living with Equity Housing</p>
        </div>

        <div className="apply-content">
          <div className="apply-form-section">
            <form className="apply-form" onSubmit={handleSubmit(onSubmit)}>
              
              {/* Personal Information Section */}
              <div className="form-section">
                <h3 className="section-title">Personal Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      {...register("fullName", { 
                        required: "Full name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters"
                        }
                      })}
                    />
                    {errors.fullName && (
                      <span className="error-message">{errors.fullName.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>ID Number *</label>
                    <input
                      type="text"
                      {...register("idNumber", { 
                        required: "ID number is required",
                        pattern: {
                          value: /^[0-9]{13}$/,
                          message: "Please enter a valid 13-digit SA ID number"
                        }
                      })}
                      placeholder="13-digit SA ID"
                    />
                    {errors.idNumber && (
                      <span className="error-message">{errors.idNumber.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      {...register("phone", { 
                        required: "Phone number is required",
                        pattern: {
                          value: /^(\+27|0)[6-8][0-9]{8}$/,
                          message: "Please enter a valid South African number"
                        }
                      })}
                      placeholder="+27 or 0..."
                    />
                    {errors.phone && (
                      <span className="error-message">{errors.phone.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date of Birth *</label>
                    <input
                      type="date"
                      {...register("dateOfBirth", { 
                        required: "Date of birth is required"
                      })}
                    />
                    {errors.dateOfBirth && (
                      <span className="error-message">{errors.dateOfBirth.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Gender *</label>
                    <select
                      {...register("gender", { 
                        required: "Please select gender" 
                      })}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    {errors.gender && (
                      <span className="error-message">{errors.gender.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="form-section">
                <h3 className="section-title">Academic Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>University *</label>
                    <select
                      {...register("university", { 
                        required: "Please select your university" 
                      })}
                    >
                      <option value="">Select University</option>
                      {universities.map(uni => (
                        <option key={uni} value={uni}>{uni}</option>
                      ))}
                    </select>
                    {errors.university && (
                      <span className="error-message">{errors.university.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Student Number *</label>
                    <input
                      type="text"
                      {...register("studentNumber", { 
                        required: "Student number is required"
                      })}
                    />
                    {errors.studentNumber && (
                      <span className="error-message">{errors.studentNumber.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Study Level *</label>
                    <select
                      {...register("studyLevel", { 
                        required: "Please select study level" 
                      })}
                    >
                      <option value="">Select Study Level</option>
                      {studyLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    {errors.studyLevel && (
                      <span className="error-message">{errors.studyLevel.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Course Type *</label>
                    <select
                      {...register("courseType", { 
                        required: "Please select course type" 
                      })}
                    >
                      <option value="">Select Course Type</option>
                      {courseTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.courseType && (
                      <span className="error-message">{errors.courseType.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-group full">
                  <label>Field of Study *</label>
                  <input
                    type="text"
                    {...register("fieldOfStudy", { 
                      required: "Field of study is required"
                    })}
                    placeholder="e.g., Computer Science, Business Management, Engineering"
                  />
                  {errors.fieldOfStudy && (
                    <span className="error-message">{errors.fieldOfStudy.message}</span>
                  )}
                </div>
              </div>

              {/* Accommodation Preferences */}
              <div className="form-section">
                <h3 className="section-title">Accommodation Preferences</h3>
                
                {/* Accommodation Building Selection */}
                <div className="building-selection">
                  <label className="compact-label">Preferred Accommodation Building *</label>
                  <div className="building-options">
                    {accommodationBuildings.map(building => (
                      <label key={building.value} className="building-option">
                        <input
                          type="radio"
                          value={building.value}
                          {...register("accommodationBuilding", { 
                            required: "Please select preferred accommodation building" 
                          })}
                        />
                        <div className="building-card">
                          <div className="building-header">
                            <span className="building-name">{building.name}</span>
                            {building.value === 'automatic' && (
                              <span className="auto-badge">Recommended</span>
                            )}
                          </div>
                          <span className="building-description">{building.description}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.accommodationBuilding && (
                    <span className="error-message">{errors.accommodationBuilding.message}</span>
                  )}
                </div>

                {selectedBuilding && selectedBuilding !== 'automatic' && (
                  <div className="building-preview">
                    <h4>You selected: {accommodationBuildings.find(b => b.value === selectedBuilding)?.name}</h4>
                    <p>This building offers excellent facilities and a great student community.</p>
                  </div>
                )}

                {selectedBuilding === 'automatic' && (
                  <div className="building-preview">
                    <h4>Automatic Placement Selected</h4>
                    <p>We'll assign you to the best available accommodation based on your preferences and availability.</p>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label>Preferred Move-in Date *</label>
                    <input
                      type="date"
                      {...register("moveInDate", { 
                        required: "Move-in date is required" 
                      })}
                    />
                    {errors.moveInDate && (
                      <span className="error-message">{errors.moveInDate.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Lease Duration *</label>
                    <select
                      {...register("duration", { 
                        required: "Please select lease duration" 
                      })}
                    >
                      <option value="">Select Duration</option>
                      <option value="6-months">6 Months</option>
                      <option value="12-months">12 Months</option>
                      <option value="academic-year">Full Academic Year</option>
                    </select>
                    {errors.duration && (
                      <span className="error-message">{errors.duration.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Monthly Budget *</label>
                    <select
                      {...register("budget", { 
                        required: "Please select your budget" 
                      })}
                    >
                      <option value="">Select Budget</option>
                      <option value="bursary">Bursary Allocation (R4,800 - R5,500)</option>
                      <option value="4000-6000">R4,000 - R6,000</option>
                      <option value="6000-8000">R6,000 - R8,000</option>
                      <option value="8000+">R8,000+</option>
                    </select>
                    {errors.budget && (
                      <span className="error-message">{errors.budget.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Room Type *</label>
                    <select
                      {...register("accommodationType", { 
                        required: "Please select room type" 
                      })}
                    >
                      <option value="">Select Type</option>
                      <option value="single-room">Single Room</option>
                      <option value="sharing">Sharing Room</option>
                    </select>
                    {errors.accommodationType && (
                      <span className="error-message">{errors.accommodationType.message}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Required Documents Upload */}
              <div className="form-section">
                <h3 className="section-title">Required Documents</h3>
                <div className="documents-upload">
                  <p className="upload-description">
                    Please upload clear photos or scans of the following required documents. 
                    Files should be in PDF, JPG, or PNG format (max 5MB each).
                  </p>
                  
                  <div className="upload-group">
                    <label>ID Document/Passport *</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...register("idDocument", { 
                        required: "ID document is required"
                      })}
                    />
                    {errors.idDocument && (
                      <span className="error-message">{errors.idDocument.message}</span>
                    )}
                  </div>

                  <div className="upload-group">
                    <label>Proof of University Registration *</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...register("proofOfRegistration", { 
                        required: "Proof of registration is required"
                      })}
                    />
                    {errors.proofOfRegistration && (
                      <span className="error-message">{errors.proofOfRegistration.message}</span>
                    )}
                  </div>

                  <div className="upload-group">
                    <label>Latest Academic Results/Transcript *</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...register("academicResults", { 
                        required: "Academic results are required"
                      })}
                    />
                    {errors.academicResults && (
                      <span className="error-message">{errors.academicResults.message}</span>
                    )}
                  </div>

                  <div className="upload-group">
                    <label>Bursary/NSFAS Award Letter (if applicable)</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...register("bursaryLetter")}
                    />
                  </div>

                  <div className="upload-group">
                    <label>Parent/Guardian ID (if under 21)</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...register("parentId")}
                    />
                  </div>

                  <div className="upload-group">
                    <label>Additional Documents (if any)</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      {...register("additionalDocuments")}
                    />
                    <small>You can select multiple files</small>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="form-section">
                <h3 className="section-title">Financial Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Funding Source *</label>
                    <select
                      {...register("fundingSource", { 
                        required: "Please select funding source" 
                      })}
                    >
                      <option value="">Select Funding</option>
                      <option value="bursary">Bursary/NSFAS</option>
                      <option value="parents">Parents/Guardians</option>
                      <option value="self-funded">Self-Funded</option>
                      <option value="student-loan">Student Loan</option>
                      <option value="scholarship">Scholarship</option>
                    </select>
                    {errors.fundingSource && (
                      <span className="error-message">{errors.fundingSource.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Bursary/NSFAS Approved?</label>
                    <select {...register("bursaryApproved")}>
                      <option value="">Select Option</option>
                      <option value="yes-approved">Yes, Approved</option>
                      <option value="yes-pending">Yes, Pending</option>
                      <option value="no">No</option>
                      <option value="not-applicable">Not Applicable</option>
                    </select>
                  </div>
                </div>

                <div className="form-group full">
                  <label>Bursary/NSFAS Reference Number (if applicable)</label>
                  <input
                    type="text"
                    {...register("bursaryReference")}
                    placeholder="Enter your bursary/NSFAS reference number"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="form-section">
                <h3 className="section-title">Emergency Contact</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Emergency Contact Name *</label>
                    <input
                      type="text"
                      {...register("emergencyName", { 
                        required: "Emergency contact name is required"
                      })}
                    />
                    {errors.emergencyName && (
                      <span className="error-message">{errors.emergencyName.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Emergency Contact Relationship *</label>
                    <select
                      {...register("emergencyRelationship", { 
                        required: "Please select relationship" 
                      })}
                    >
                      <option value="">Select Relationship</option>
                      <option value="parent">Parent</option>
                      <option value="guardian">Guardian</option>
                      <option value="sibling">Sibling</option>
                      <option value="spouse">Spouse</option>
                      <option value="other-relative">Other Relative</option>
                      <option value="friend">Friend</option>
                    </select>
                    {errors.emergencyRelationship && (
                      <span className="error-message">{errors.emergencyRelationship.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Emergency Contact Phone *</label>
                    <input
                      type="tel"
                      {...register("emergencyPhone", { 
                        required: "Emergency phone is required",
                        pattern: {
                          value: /^(\+27|0)[6-8][0-9]{8}$/,
                          message: "Please enter a valid South African number"
                        }
                      })}
                    />
                    {errors.emergencyPhone && (
                      <span className="error-message">{errors.emergencyPhone.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Emergency Contact Email</label>
                    <input
                      type="email"
                      {...register("emergencyEmail")}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="form-section">
                <h3 className="section-title">Additional Information</h3>
                <div className="form-group full">
                  <label>Special Requirements or Medical Conditions</label>
                  <textarea
                    rows="3"
                    {...register("specialRequirements")}
                    placeholder="Please mention any medical conditions, disabilities, allergies, or special accommodation requirements we should know about"
                  />
                </div>

                <div className="form-group full">
                  <label>How did you hear about us? *</label>
                  <select
                    {...register("referralSource", { 
                      required: "Please select how you heard about us" 
                    })}
                  >
                    <option value="">Select Option</option>
                    <option value="university">University Notice Board</option>
                    <option value="friend">Friend Referral</option>
                    <option value="social-media">Social Media</option>
                    <option value="website">Website</option>
                    <option value="email">Email Campaign</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.referralSource && (
                    <span className="error-message">{errors.referralSource.message}</span>
                  )}
                </div>

                <div className="form-group full">
                  <label>Additional Comments</label>
                  <textarea
                    rows="3"
                    {...register("comments")}
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>
              </div>

              {/* Declaration */}
              <div className="declaration-section">
                <div className="declaration-checkbox">
                  <input
                    type="checkbox"
                    {...register("declaration", { 
                      required: "You must accept the terms and conditions" 
                    })}
                  />
                  <label>
                    I hereby declare that the information provided is true and correct. 
                    I understand that providing false information may result in the rejection 
                    of my application or termination of my accommodation agreement. *
                  </label>
                </div>
                {errors.declaration && (
                  <span className="error-message">{errors.declaration.message}</span>
                )}
              </div>

              <button type="submit" className="apply-submit">
                Submit Application
              </button>
            </form>
          </div>

          {/* Application Sidebar */}
          <div className="apply-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-header">
                <h3>Application Process</h3>
              </div>
              
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Submit Application</h4>
                    <p>Complete this form with all required information</p>
                  </div>
                </div>

                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Document Verification</h4>
                    <p>We'll verify your student status and documents</p>
                  </div>
                </div>

                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Approval & Contract</h4>
                    <p>Receive approval and sign accommodation contract</p>
                  </div>
                </div>

                <div className="process-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Move In</h4>
                    <p>Welcome to your new student home!</p>
                  </div>
                </div>
              </div>

              <div className="required-docs">
                <h4>Required Documents</h4>
                <div className="doc-item">✓ ID Document/Passport</div>
                <div className="doc-item">✓ Proof of Registration</div>
                <div className="doc-item">✓ Academic Results</div>
                <div className="doc-item">✓ Bursary Letter (if applicable)</div>
                <div className="doc-item">✓ Parent ID (if under 21)</div>
              </div>

              <div className="accommodation-info">
                <h4>Our Accommodations</h4>
                <div className="accommodation-item">🏠 Rosenhof - Premium</div>
                <div className="accommodation-item">🏠 Meldine - Secure</div>
                <div className="accommodation-item">🏠 Ashbrough Heights - Luxury</div>
                <div className="accommodation-item">🏠 VLU - Vibrant</div>
                <div className="accommodation-item">🏠 Heather Court - Affordable</div>
              </div>

              <div className="support-info">
                <h4>Need Help?</h4>
                <div className="support-item">
                  <span className="support-icon">📞</span>
                  <span>+27 82 580 8046</span>
                </div>
                <div className="support-item">
                  <span className="support-icon">✉️</span>
                  <span>info@equityhousing.co.za</span>
                </div>
                <div className="support-item">
                  <span className="support-icon">⏰</span>
                  <span>Response within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;