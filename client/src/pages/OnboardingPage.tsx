import { useEffect } from 'react';
import onboardingHTML from '../../../TPSOnboarding.html?raw';

export default function OnboardingPage() {
  useEffect(() => {
    // Initialize form interactivity
    const form = document.getElementById('onboardForm');
    if (!form) return;

    // Attach event listeners to section headers for toggle functionality
    const headers = document.querySelectorAll('.section-header');
    headers.forEach(header => {
      header.addEventListener('click', (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        toggleSection(target);
      });
    });

    // Attach event listeners to progress steps
    const progSteps = document.querySelectorAll('.prog-step');
    progSteps.forEach((step, index) => {
      step.addEventListener('click', () => {
        scrollToSection(index);
      });
    });

    // Attach form submission handler
    form.addEventListener('submit', handleFormSubmit);

    // Update progress on scroll
    window.addEventListener('scroll', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  const toggleSection = (header: HTMLElement | null) => {
    if (!header) return;
    const section = header.closest('.form-section');
    if (!section) return;

    const body = section.querySelector('.section-body') as HTMLElement;
    const chevron = header.querySelector('.chevron') as HTMLElement;

    if (body) {
      body.classList.toggle('open');
    }
    if (chevron) {
      chevron.classList.toggle('open');
    }
    if (header) {
      header.classList.toggle('open');
    }
  };

  const scrollToSection = (index: number) => {
    const section = document.getElementById(`sec${index}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const updateProgress = () => {
    const sections = document.querySelectorAll('.form-section');
    const progFill = document.getElementById('progressFill') as HTMLElement;
    const progSteps = document.querySelectorAll('.prog-step');

    if (!progFill || sections.length === 0) return;

    let visibleCount = 0;
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.5;

      if (isVisible) {
        visibleCount = index + 1;
      }

      const step = progSteps[index] as HTMLElement;
      if (step) {
        if (isVisible) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      }
    });

    const progress = (visibleCount / sections.length) * 100;
    progFill.style.width = `${progress}%`;
  };

  const handleFormSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const btn = form.querySelector('.submit-btn') as HTMLButtonElement;

    if (!btn) return;

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner"></i> Submitting…';

    const getVal = (name: string): string => {
      const input = form.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      return input ? input.value : '';
    };

    const getToggle = (name: string): boolean => {
      const input = form.querySelector(`[name="${name}"]`) as HTMLInputElement;
      return input ? input.checked : false;
    };

    const buildBedroomSummary = (num: number): string => {
      const bedType = getVal(`bedroom_${num}_bed_type`);
      const bedCount = getVal(`bedroom_${num}_bed_count`);
      if (!bedType && !bedCount) return '';
      return `${bedCount} ${bedType}`;
    };

    const fields: Record<string, any> = {
      'First Name': getVal('first_name'),
      'Last Name': getVal('last_name'),
      'Business Name': getVal('business_name'),
      'Email': getVal('email'),
      'Primary Phone': getVal('primary_phone'),
      'Secondary Phone': getVal('secondary_phone'),
      'Preferred Contact': getVal('preferred_contact'),
      'Best Time to Reach': getVal('best_time_to_reach'),
      'Mailing Street': getVal('mailing_street'),
      'Mailing City': getVal('mailing_city'),
      'Mailing State': getVal('mailing_state'),
      'Mailing ZIP': getVal('mailing_zip'),
      'Property Street': getVal('property_street'),
      'Property City': getVal('property_city'),
      'Property State': getVal('property_state'),
      'Property ZIP': getVal('property_zip'),
      'Property Type': getVal('property_type'),
      'Total Bedrooms': getVal('bedrooms'),
      'Total Bathrooms': getVal('bathrooms'),
      'Max Occupancy': getVal('max_occupancy'),
      'Square Footage': getVal('square_footage'),
      'Year Built': getVal('year_built'),
      'HOA Name': getVal('hoa_name'),
      'HOA Monthly Fee': getVal('hoa_monthly_fee'),
      'HOA Rental Restrictions': getVal('hoa_rental_restrictions'),
      'Community Amenities': getVal('community_amenities'),
      'Gated Community': getToggle('gated_community'),
      'Gate Code': getVal('gate_code'),
      'Front Door Lock Type': getVal('front_door_lock_type'),
      'Garage': getVal('garage_type'),
      'Garage Code': getVal('garage_code'),
      'Garage Remote': getToggle('garage_remote'),
      'Garage Remote Count': getVal('garage_remote_count'),
      'Back Door Lock Type': getVal('back_door_lock_type'),
      'Side Door Lock Type': getVal('side_door_lock_type'),
      'Key Lockbox Location': getVal('key_lockbox_location'),
      'Keypad Code': getVal('keypad_code'),
      'Smart Lock Type': getVal('smart_lock_type'),
      'Smart Lock Code': getVal('smart_lock_code'),
      'Pool': getVal('pool_type'),
      'Pool Heater': getToggle('pool_heater'),
      'Pool Heater Type': getVal('pool_heater_type'),
      'Hot Tub': getToggle('hot_tub'),
      'Hot Tub Chemicals Location': getVal('hot_tub_chemicals_location'),
      'Outdoor Kitchen': getToggle('outdoor_kitchen'),
      'Grill Type': getVal('grill_type'),
      'Grill Propane': getToggle('grill_propane'),
      'Grill Propane Location': getVal('grill_propane_location'),
      'Patio Furniture': getToggle('patio_furniture'),
      'Patio Furniture Count': getVal('patio_furniture_count'),
      'Patio Heater': getToggle('patio_heater'),
      'Patio Heater Fuel': getVal('patio_heater_fuel'),
      'Patio Heater Location': getVal('patio_heater_location'),
      'Electric Provider': getVal('electric_provider'),
      'Electric Account Number': getVal('electric_account_number'),
      'Water Provider': getVal('water_provider'),
      'Water Account Number': getVal('water_account_number'),
      'Gas Provider': getVal('gas_provider'),
      'Gas Account Number': getVal('gas_account_number'),
      'Internet Provider': getVal('internet_provider'),
      'Internet Account Number': getVal('internet_account_number'),
      'WiFi Network Name': getVal('wifi_network_name'),
      'WiFi Password': getVal('wifi_password'),
      'WiFi Router Location': getVal('wifi_router_location'),
      'Thermostat Type': getVal('thermostat_type'),
      'Thermostat Settings': getVal('thermostat_settings'),
      'HVAC Maintenance Schedule': getVal('hvac_maintenance_schedule'),
      'Water Heater Type': getVal('water_heater_type'),
      'Water Heater Location': getVal('water_heater_location'),
      'Septic System': getToggle('septic_system'),
      'Septic Maintenance Schedule': getVal('septic_maintenance_schedule'),
      'Trash Bin Location': getVal('trash_bin_location'),
      'Airbnb URL': getVal('airbnb_url'),
      'Airbnb Email': getVal('airbnb_email'),
      'VRBO URL': getVal('vrbo_url'),
      'VRBO Email': getVal('vrbo_email'),
      'Booking.com URL': getVal('booking_url'),
      'Booking.com Email': getVal('booking_email'),
      'Other Platforms': getVal('other_platforms'),
      'Rate Low Season': getVal('rate_low_season'),
      'Rate High Season': getVal('rate_high_season'),
      'Minimum Nights': getVal('minimum_nights'),
      'Calendar Notes': getVal('calendar_notes'),
      'Bedroom 1': buildBedroomSummary(1),
      'Bedroom 2': buildBedroomSummary(2),
      'Bedroom 3': buildBedroomSummary(3),
      'Bedroom 4': buildBedroomSummary(4),
      'Bedroom 5': buildBedroomSummary(5),
      'Bedroom 6': buildBedroomSummary(6),
      'Bedroom 7': buildBedroomSummary(7),
      'Bedroom 8': buildBedroomSummary(8),
      'Bedroom 9': buildBedroomSummary(9),
      'Towel Sets Per Bathroom': getVal('towel_sets_per_bathroom'),
      'Bath Mats Per Bathroom': getVal('bath_mats_per_bathroom'),
      'Dishes For Guests': getVal('dishes_for_guests'),
      'Coffee Maker Type': getVal('coffee_maker_type'),
      'Cooking Utensils Adequate': getToggle('cooking_utensils_adequate'),
      'Kitchen Towel Sets': getVal('kitchen_towel_sets'),
      'Has Vacuum': getToggle('has_vacuum'),
      'Vacuum Type': getVal('vacuum_type'),
      'Has Mop': getToggle('has_mop'),
      'Has Broom': getToggle('has_broom'),
      'Has Iron': getToggle('has_iron'),
      'Washer & Dryer': getVal('washer_dryer_status'),
      'Cleaning Storage Location': getVal('cleaning_storage_location'),
      'Cleaning Company Contact': getVal('cleaning_company_contact'),
      'Turnover Time': getVal('turnover_time'),
      'Repairs Needed': getVal('repairs_needed'),
      'Planned Upgrades': getVal('planned_upgrades'),
      'Pest Control Info': getVal('pest_control_info'),
      'Last Inspection Date': getVal('last_inspection_date'),
      'Appliance Quirks': getVal('appliance_quirks'),
      'Guest Restricted Items': getVal('guest_restricted_items'),
      'House Rules': getVal('house_rules'),
      'Additional Notes': getVal('additional_notes'),
      'DPBR Registered': getToggle('dpbr_registered'),
      'DPBR License Number': getVal('dpbr_license_number'),
      'Osceola County': getToggle('osceola_county'),
      'Tourist Tax Filed': getToggle('tourist_tax_filed'),
      'Tourist Tax License Number': getVal('tourist_tax_license_number'),
    };

    // Remove empty strings to keep payload clean
    const cleanFields: Record<string, any> = {};
    for (const [key, val] of Object.entries(fields)) {
      if (val !== '' && val !== null && val !== undefined) {
        cleanFields[key] = val;
      }
    }

    try {
      const response = await fetch(
        'https://api.airtable.com/v0/appttSCU5u68yVq0p/tbluX3DOgpxFIclwP',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer patiV4uEtzSBDSNah.73e974eb21b9d045e33c06e7d3b937e0930d333f338b01482b41df7b2f7af703',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fields: cleanFields })
        }
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error((errData as any).error?.message || `HTTP ${response.status}`);
      }

      // Success
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Form Submitted — Thank You!';
      btn.style.background = 'linear-gradient(135deg, #27AE60, #2ECC71)';
      btn.style.boxShadow = '0 6px 24px rgba(39,174,96,.38)';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      // Error
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Submission Failed — Please Try Again';
      btn.style.background = 'linear-gradient(135deg, #E74C3C, #C0392B)';
      btn.style.boxShadow = '0 6px 24px rgba(231,76,60,.38)';
      console.error('Form submission error:', err);

      // Reset button after 5 seconds
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Property Onboarding Form';
        btn.style.background = 'linear-gradient(135deg, var(--orange) 0%, var(--gold) 100%)';
        btn.style.boxShadow = '0 6px 24px rgba(244,123,32,.38)';
      }, 5000);
    }
  };

  return (
    <div
      dangerouslySetInnerHTML={{ __html: onboardingHTML }}
      style={{ width: '100%' }}
    />
  );
}
