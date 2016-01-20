using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Data.Models.Mapping
{
    public class PaymentMap : EntityTypeConfiguration<Payment>
    {
        public PaymentMap()
        {
            // Primary Key
            this.HasKey(t => t.PaymentId);

            // Properties
            this.Property(t => t.TransactionId)
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("Payment");
            this.Property(t => t.PaymentId).HasColumnName("PaymentId");
            this.Property(t => t.Amount).HasColumnName("Amount");
            this.Property(t => t.PmtDate).HasColumnName("PmtDate");
            this.Property(t => t.UserId).HasColumnName("UserId");
            this.Property(t => t.TransactionId).HasColumnName("TransactionId");
        }
    }
}
